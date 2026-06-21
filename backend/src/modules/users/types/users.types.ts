import { Role } from "@prisma/client";

export type UserProfile = {
  id: string;
  email: string;
  name: string;
  role: Role;
  phone: string | null;
  homeAirport: string | null;
  travelStyle: string;
  createdAt: Date;
  updatedAt: Date;
};
