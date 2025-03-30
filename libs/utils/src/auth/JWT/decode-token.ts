import { IJwtTokenPayload } from '@check-me/models';
import { jwtDecode } from 'jwt-decode';

export const decodeToken = (token: string): IJwtTokenPayload | null => {
  try {
    return jwtDecode<IJwtTokenPayload>(token);
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};
