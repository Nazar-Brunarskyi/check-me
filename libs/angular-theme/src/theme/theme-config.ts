import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';

import { borderColors } from './colors/border';
import { elementalColors } from './colors/elemental';
import { primaryColors } from './colors/primary';

import { button } from './components/button/button';

export const theme = definePreset(Aura, {
  primitive: {
    [elementalColors.prefix]: elementalColors.colors,
    [borderColors.prefix]: borderColors.colors,
  },
  semantic: {
    primary: primaryColors.colors,
  },
  components: {
    button,
  },
});
