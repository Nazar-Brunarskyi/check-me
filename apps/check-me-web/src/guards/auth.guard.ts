import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { isTokenValid } from '@check-me/utils/auth/JWT/is-token-valid';
import { catchError, map, of } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const { accessToken, refreshToken } = authService.getTokens;

  if (!accessToken || !refreshToken) {
    router.navigate(['/auth']);
    return of(false);
  }

  const tokenIsValid = isTokenValid(accessToken);

  if (!tokenIsValid) {
    return authService.refresh().pipe(
      map(() => true),
      catchError(() => of(router.parseUrl('/auth'))),
    );
  }

  return of(true);
};
