import { api, unwrap } from "./api";
import type { AuthResult, AuthTokens, User } from "../types";

export type LoginInput = { email: string; password: string };
export type RegisterInput = LoginInput & {
  name: string;
  phone?: string;
  homeAirport?: string;
  travelStyle?: string;
};

export const authService = {
  login: (input: LoginInput) => unwrap<AuthResult>(api.post("/auth/login", input)),
  register: (input: RegisterInput) => unwrap<AuthResult>(api.post("/auth/register", input)),
  refresh: (refreshToken: string) => unwrap<AuthTokens>(api.post("/auth/refresh", { refreshToken })),
  me: () => unwrap<User>(api.get("/auth/me")),
  logout: () => unwrap<{ loggedOut: boolean }>(api.post("/auth/logout"))
};
