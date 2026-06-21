export type RegisterDto = {
  email: string;
  password: string;
  name: string;
  phone?: string;
  homeAirport?: string;
  travelStyle?: string;
};

export type LoginDto = {
  email: string;
  password: string;
};

export type RefreshTokenDto = {
  refreshToken: string;
};

export type LogoutDto = {
  refreshToken?: string;
};
