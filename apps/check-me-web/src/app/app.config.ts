import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { getAngularThemeProviders } from '@check-me/angular-theme';
import { environment } from '../environments/environment';
import { ENVIRONMENT_CONFIG } from '../injection-tokens/environment.token';
import { authInterceptor } from '../interceptors/auth.interceptors';
import { appRoutes } from './app.routes';
import { MessageService } from 'primeng/api';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: ENVIRONMENT_CONFIG, useValue: environment },
    provideHttpClient(withInterceptors([authInterceptor])),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes, withComponentInputBinding()),
    MessageService,
    ...getAngularThemeProviders(),
  ],
};
