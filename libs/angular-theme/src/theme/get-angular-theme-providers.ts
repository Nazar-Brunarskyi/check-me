import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { theme } from './theme-config';

export const getAngularThemeProviders = () => [
  provideAnimationsAsync(),
  providePrimeNG({
    theme: {
      preset: theme,
    },
  }),
];
