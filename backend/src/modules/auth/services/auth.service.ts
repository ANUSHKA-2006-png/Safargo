import { AppError } from "../../../shared/app-error";
import { comparePassword, hashPassword } from "../../../shared/password";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "../../../shared/jwt";
import { AuthRepository, AuthUserRecord } from "../repositories/auth.repository";
import { LoginDto, RegisterDto } from "../dto/auth.dto";
import { AuthResult, AuthTokens, PublicUser } from "../types/auth.types";

export class AuthService {
  constructor(private readonly repository = new AuthRepository()) {}

  async register(dto: RegisterDto): Promise<AuthResult> {
    const existing = await this.repository.findByEmail(dto.email);
    if (existing) throw new AppError(409, "Email is already registered", "EMAIL_EXISTS");

    const passwordHash = await hashPassword(dto.password);
    const user = await this.repository.create({
      email: dto.email.toLowerCase(),
      passwordHash,
      name: dto.name,
      phone: dto.phone,
      homeAirport: dto.homeAirport,
      travelStyle: dto.travelStyle ?? "balanced"
    });

    const tokens = await this.issueTokens(user);
    return { user: this.toPublicUser(user), tokens };
  }

  async login(dto: LoginDto): Promise<AuthResult> {
    const user = await this.repository.findByEmail(dto.email);
    if (!user) throw new AppError(401, "Invalid email or password", "INVALID_CREDENTIALS");

    const valid = await comparePassword(dto.password, user.passwordHash);
    if (!valid) throw new AppError(401, "Invalid email or password", "INVALID_CREDENTIALS");

    const tokens = await this.issueTokens(user);
    return { user: this.toPublicUser(user), tokens };
  }

  async refresh(refreshToken: string): Promise<AuthTokens> {
    const payload = verifyRefreshToken(refreshToken);
    const user = await this.repository.findById(payload.sub);
    if (!user?.refreshTokenHash) {
      throw new AppError(401, "Refresh token is not valid", "REFRESH_INVALID");
    }

    const valid = await comparePassword(refreshToken, user.refreshTokenHash);
    if (!valid) throw new AppError(401, "Refresh token is not valid", "REFRESH_INVALID");

    return this.issueTokens(user);
  }

  async logout(userId: string) {
    await this.repository.updateRefreshTokenHash(userId, null);
  }

  async me(userId: string): Promise<PublicUser> {
    const user = await this.repository.findById(userId);
    if (!user) throw new AppError(404, "User was not found", "USER_NOT_FOUND");
    return this.toPublicUser(user);
  }

  private async issueTokens(user: AuthUserRecord): Promise<AuthTokens> {
    const payload = { sub: user.id, email: user.email, role: user.role };
    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);
    const refreshTokenHash = await hashPassword(refreshToken);
    await this.repository.updateRefreshTokenHash(user.id, refreshTokenHash);
    return { accessToken, refreshToken };
  }

  private toPublicUser(user: AuthUserRecord): PublicUser {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      phone: user.phone,
      homeAirport: user.homeAirport,
      travelStyle: user.travelStyle,
      createdAt: user.createdAt
    };
  }
}
