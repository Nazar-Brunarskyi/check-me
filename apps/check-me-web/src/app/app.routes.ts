import { Route } from '@angular/router';
import { authGuard } from '../shared/guards/auth.guard';
import { canActivateRuthRouteGuard } from '../shared/guards/can-activate-auth-route.guard';

export const appRoutes: Route[] = [
  {
    path: 'auth',
    canActivate: [canActivateRuthRouteGuard],
    loadComponent: () =>
      import('../components/_layouts/auth-layout/auth-layout.component').then((c) => c.AuthLayoutComponent),
    children: [
      {
        path: '',
        // path: 'telegram-login',
        loadComponent: () =>
          import('./auth/telegram-login-page/telegram-login-page.component').then((c) => c.TelegramLoginPageComponent),
      },
    ],
  },
  {
    path: '',
    loadComponent: () =>
      import('../components/_layouts/base-layout/base-layout.component').then((c) => c.BaseLayoutComponent),
    children: [
      {
        path: '',
        canActivate: [authGuard],
        loadComponent: () => import('./main-page/main-page.component').then((c) => c.MainPageComponent),
      },
      {
        path: '**',
        loadComponent: () => import('./not-found-page/not-found-page.component').then((c) => c.NotFoundPageComponent),
      },
    ],
  },
];
