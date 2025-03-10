import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';

export const theme = definePreset(Aura, {
  primitive: {
    goldenYellow: {
      50: '#fffdf8',
      100: '#fff4db',
      200: '#ffecbf',
      300: '#ffe4a2',
      400: '#ffdb86',
      500: '#ffd369',
      600: '#d9b359',
      700: '#b3944a',
      800: '#8c743a',
      900: '#66542a',
      950: '#40351a',
    },
  },
  semantic: {
    primary: {
      50: '#f4f4f5',
      100: '#cacbce',
      200: '#a0a3a6',
      300: '#767a7f',
      400: '#4c5158',
      500: '#222831',
      600: '#1d222a',
      700: '#181c22',
      800: '#13161b',
      900: '#0e1014',
      950: '#090a0c',
    },
  },
  components: {
    button: {
      colorScheme: {
        light: {
          root: {
            primary: {
              background: '{goldenYellow.500}',
              borderColor: '{goldenYellow.500}',
            },
          },
        },
      },
    },
  },
});
