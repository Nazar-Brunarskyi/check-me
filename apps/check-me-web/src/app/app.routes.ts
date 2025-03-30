import { Route } from '@angular/router';
import { authGuard } from '../guards/auth.guard';
import { canActivateRuthRouteGuard } from '../guards/can-activate-auth-route.guard';

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
          import('../components/_routes/telegram-login-page/telegram-login-page.component').then(
            (c) => c.TelegramLoginPageComponent,
          ),
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
        loadComponent: () =>
          import('../components/_routes/main-page/main-page.component').then((c) => c.MainPageComponent),
      },
      {
        path: '**',
        loadComponent: () =>
          import('../components/_routes/not-found-page/not-found-page.component').then((c) => c.NotFoundPageComponent),
      },
    ],
  },
];
