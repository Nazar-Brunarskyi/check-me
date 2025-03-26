import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { getAngularThemeProviders } from '@check-me/angular-theme';
import { environment } from '../environments/environment';
import { ENVIRONMENT_CONFIG } from '../injection-tokens/environment.token';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: ENVIRONMENT_CONFIG, useValue: environment },
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    ...getAngularThemeProviders(),
  ],
};
