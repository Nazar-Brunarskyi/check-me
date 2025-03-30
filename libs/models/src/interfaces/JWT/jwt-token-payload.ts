export interface IJwtTokenPayload {
  sub: string;
  firstName: string;
  lastName?: string;
  iat?: number;
  exp?: number;
}
