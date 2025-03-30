import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const { accessToken } = authService.getTokens;
  const hasAuthorizationHeader = req.headers.has('Authorization');

  if (hasAuthorizationHeader) return next(req);
  if (!accessToken) return next(req);

  return next(cloneRequestWithToken(req, authService)).pipe(
    catchError((error) => {
      if (error.status === 401) {
        return handleRefreshToken(authService, req, next);
      }

      return throwError(() => error);
    }),
  );
};

const handleRefreshToken = (authService: AuthService, req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  return authService.refresh().pipe(switchMap(() => next(cloneRequestWithToken(req, authService))));
};

const cloneRequestWithToken = (req: HttpRequest<unknown>, authService: AuthService) => {
  const { accessToken } = authService.getTokens;

  return req.clone({
    setHeaders: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
