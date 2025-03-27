import { Route } from '@angular/router';


export const appRoutes: Route[] = [
  { path: 'auth', loadComponent: () => import('../components/_layouts/auth-layout/auth-layout.component').then((c) => c.AuthLayoutComponent) },
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
