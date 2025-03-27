import { Route } from '@angular/router';
import { LoginPageComponent } from '../components/_routes/login-page/login-page.component';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('../components/layouts/base-layout/base-layout.component').then((c) => c.BaseLayoutComponent),
    children: [{ path: '', component: LoginPageComponent, pathMatch: 'full' }],
  },
  { path: 'auth', component: LoginPageComponent },
];
