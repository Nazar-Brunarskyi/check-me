import { IPrimitiveObject } from '../interfaces/primitive-object';
import { goldenYellowColors } from './primitive/golden-yellow';

interface ItailwindColors {
  [key: string]: string;
}

const primitiveColorsArray: IPrimitiveObject[] = [goldenYellowColors];

export const getTailwindColors = () => {
  const colors: ItailwindColors = {};
  primitiveColorsArray.forEach((color) => {
    const { prefix, colors: colorValues } = color;

    for (const key in colorValues) {
      if (Object.prototype.hasOwnProperty.call(colorValues, key)) {
        const element = colorValues[key];
        colors[`${prefix}-${key}`] = element;
      }
    }
  });

  return colors;
};
