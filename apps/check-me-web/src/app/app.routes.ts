import { Route } from '@angular/router';
import { LoginPageComponent } from '../components/_routes/login-page/login-page.component';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('../components/layouts/base-layout/base-layout.component').then((c) => c.BaseLayoutComponent),
    children: [
      {
        path: 'aaa',
        loadComponent: () =>
          import('../components/_routes/login-page/login-page.component').then((c) => c.LoginPageComponent),
      },
    ],
  },
  { path: 'auth', component: LoginPageComponent },
];
