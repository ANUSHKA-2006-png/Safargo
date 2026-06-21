export type UpdateUserDto = {
  name?: string;
  phone?: string | null;
  homeAirport?: string | null;
  travelStyle?: string;
};

export type UserQueryDto = {
  page?: number;
  limit?: number;
  search?: string;
};
