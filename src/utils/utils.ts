'use strict';

/* ---------- global functions - vendors ------------ */

export class Utils {
  public static hexToRgb(hex: string) {
    // By Tim Down - http://stackoverflow.com/a/5624139/3493650
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;

    hex = hex.replace(shorthandRegex, (m, r, g, b) => {
      return r + r + g + g + b + b;
    });

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    } : null;
  }

  public static clamp(number: number, min: number, max: number) {
    return Math.min(Math.max(number, min), max);
  }

  public static isInArray<T>(value: T, array: T[] | T) {
    return value == array || (array as T[]).indexOf(value) > -1;
  }

  public static deepExtend(destination: any, source: any) {
    for (let property in source) {
      if (source[property] && source[property].constructor && source[property].constructor === Object) {
        destination[property] = destination[property] || {};

        Utils.deepExtend(destination[property], source[property]);
      } else {
        destination[property] = source[property];
      }
    }
    return destination;
  }
}
