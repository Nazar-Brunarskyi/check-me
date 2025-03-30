import { DateTime } from 'luxon';
import { decodeToken } from './decode-token';

export const isTokenValid = (token: string): boolean => {
  const decodedToken = decodeToken(token);
  if (!decodedToken) {
    return false;
  }

  if (!decodedToken.exp) {
    return false;
  }

  const expirationTime = DateTime.fromSeconds(decodedToken.exp);
  const now = DateTime.now();
  return expirationTime > now;
};
