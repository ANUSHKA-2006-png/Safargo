import { Role, User } from "@prisma/client";
import { AppError } from "../../../shared/app-error";
import { UpdateUserDto, UserQueryDto } from "../dto/users.dto";
import { UsersRepository } from "../repositories/users.repository";
import { UserProfile } from "../types/users.types";

export class UsersService {
  constructor(private readonly repository = new UsersRepository()) {}

  async list(query: UserQueryDto) {
    const page = query.page ?? 1;
    const limit = Math.min(query.limit ?? 20, 100);
    const result = await this.repository.list(page, limit, query.search);
    return {
      users: result.items.map(this.toProfile),
      pagination: { page, limit, total: result.total, pages: Math.ceil(result.total / limit) }
    };
  }

  async getProfile(requesterId: string, requesterRole: Role, userId: string) {
    if (requesterRole !== Role.ADMIN && requesterId !== userId) {
      throw new AppError(403, "You can only access your own profile", "FORBIDDEN");
    }
    const user = await this.repository.findById(userId);
    if (!user) throw new AppError(404, "User was not found", "USER_NOT_FOUND");
    return this.toProfile(user);
  }

  async updateProfile(userId: string, dto: UpdateUserDto) {
    const user = await this.repository.update(userId, dto);
    return this.toProfile(user);
  }

  private toProfile(user: User): UserProfile {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      phone: user.phone,
      homeAirport: user.homeAirport,
      travelStyle: user.travelStyle,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
  }
}
