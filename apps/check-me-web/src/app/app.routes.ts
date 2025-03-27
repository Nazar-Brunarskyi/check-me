import { Route } from '@angular/router';
import { LoginPageComponent } from '../components/_routes/login-page/login-page.component';

export const appRoutes: Route[] = [
  { path: 'auth', component: LoginPageComponent },
  {
    path: '',
    loadComponent: () =>
      import('../components/layouts/base-layout/base-layout.component').then((c) => c.BaseLayoutComponent),
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
