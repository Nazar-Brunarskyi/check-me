import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { getAngularThemeProviders } from '@check-me/angular-theme';
// import { getAngularThemeProviders } from '@check-me/angular-theme/theme/get-angular-theme-providers';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    ...getAngularThemeProviders(),
  ],
};
