import { IColorObject } from './interfaces/color-object';

interface ItailwindColors {
  [key: string]: string;
}

export const getTailwindColors = (colorsArray: IColorObject[]) => {
  const colors: ItailwindColors = {};
  colorsArray.forEach((color) => {
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
