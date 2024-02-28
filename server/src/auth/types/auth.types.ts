export interface LogoutResponse {
  message: string;
  status: number;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
}

export interface UserPayload {
  id: string;
  name: string;
}

export interface AccessTokenPayload {
  sub: string;
  name: string;
  role: string;
}

export interface RefreshTokenPayload {
  sub: string;
  tokenType: string;
}
