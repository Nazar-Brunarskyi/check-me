import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';
import { goldenYellowColors } from './primitive/golden-yellow';
import { primaryColors } from './semantic/primary';

export const theme = definePreset(Aura, {
  primitive: {
    [goldenYellowColors.prefix]: goldenYellowColors.colors,
  },
  semantic: {
    primary: primaryColors,
  },
  components: {
    button: {
      colorScheme: {
        light: {
          root: {
            primary: {
              background: '{golden-yellow.500}',
              borderColor: '{golden-yellow.500}',
            },
          },
        },
      },
    },
  },
});
