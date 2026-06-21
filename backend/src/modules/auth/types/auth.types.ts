import { Role } from "@prisma/client";

export type PublicUser = {
  id: string;
  email: string;
  name: string;
  role: Role;
  phone: string | null;
  homeAirport: string | null;
  travelStyle: string;
  createdAt: Date;
};

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export type AuthResult = {
  user: PublicUser;
  tokens: AuthTokens;
};
