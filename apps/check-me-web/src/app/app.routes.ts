import { Route } from '@angular/router';
import { LoginPageComponent } from '../components/_routes/login-page/login-page.component';
import { BaseLayoutComponent } from '../components/layouts/base-layout/base-layout.component';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: BaseLayoutComponent,
    children: [{ path: '', component: LoginPageComponent, pathMatch: 'full' }],
  },
  { path: 'auth', component: LoginPageComponent },
];
