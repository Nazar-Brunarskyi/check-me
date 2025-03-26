import { Route } from '@angular/router';
import { LoginPageComponent } from '../components/_routes/login-page/login-page.component';

export const appRoutes: Route[] = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];
