import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const canActivateRuthRouteGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const { accessToken, refreshToken } = authService.getTokens;

  if (accessToken || refreshToken) {
    router.navigate(['/']);
    return of(false);
  }

  return of(true);
};
