import { api, unwrap } from "./api";
import type { User } from "../types";

export type UpdateProfileInput = {
  name?: string;
  phone?: string | null;
  homeAirport?: string | null;
  travelStyle?: string;
};

export const userService = {
  updateMe: (input: UpdateProfileInput) => unwrap<User>(api.patch("/users/me/profile", input))
};
