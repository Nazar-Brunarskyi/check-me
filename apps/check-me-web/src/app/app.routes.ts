import { Route } from '@angular/router';

import { AuthLayuotComponent } from '../components/_layouts/auth-layuot/auth-layuot.component';

export const appRoutes: Route[] = [
  { path: 'auth', component: AuthLayuotComponent },
  {
    path: '',
    loadComponent: () =>
      import('../components/_layouts/base-layout/base-layout.component').then((c) => c.BaseLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('../components/_routes/login-page/login-page.component').then((c) => c.LoginPageComponent),
      },
      {
        path: '**',
        loadComponent: () =>
          import('../components/_routes/not-found-page/not-found-page.component').then((c) => c.NotFoundPageComponent),
      },
    ],
  },
];
