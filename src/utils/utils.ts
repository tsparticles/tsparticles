"use strict";

import { ICoordinates, IOptions, IRgb } from "./interfaces";
import { MoveDirection } from "./enums/generics";

/* ---------- global functions - vendors ------------ */

export class Utils {
  public static hexToRgb(hex: string): IRgb | null {
    // By Tim Down - http://stackoverflow.com/a/5624139/3493650
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;

    const hexFixed = hex.replace(shorthandRegex, (m, r, g, b) => {
      return r + r + g + g + b + b;
    });

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexFixed);

    return result ? {
      b: parseInt(result[3], 16),
      g: parseInt(result[2], 16),
      r: parseInt(result[1], 16),
    } : null;
  }

  public static clamp(num: number, min: number, max: number): number {
    return Math.min(Math.max(num, min), max);
  }

  public static isInArray<T>(value: T, array: T[] | T): boolean {
    return value === array || (array as T[]).indexOf(value) > -1;
  }

  public static deepExtend(destination: any, source: any): any {
    for (const property in source) {
      if (source[property] && source[property].constructor && source[property].constructor === Object) {
        destination[property] = destination[property] || {};

        Utils.deepExtend(destination[property], source[property]);
      } else {
        destination[property] = source[property];
      }
    }
    return destination;
  }

  public static getVelBase(options: IOptions): ICoordinates {
    let velbase: ICoordinates;

    switch (options.particles.move.direction) {
      case MoveDirection.top:
        velbase = { x: 0, y: -1 };
        break;
      case MoveDirection.topRight:
        velbase = { x: 0.5, y: -0.5 };
        break;
      case MoveDirection.right:
        velbase = { x: 1, y: -0 };
        break;
      case MoveDirection.bottomRight:
        velbase = { x: 0.5, y: 0.5 };
        break;
      case MoveDirection.bottom:
        velbase = { x: 0, y: 1 };
        break;
      case MoveDirection.bottomLeft:
        velbase = { x: -0.5, y: 1 };
        break;
      case MoveDirection.left:
        velbase = { x: -1, y: 0 };
        break;
      case MoveDirection.topLeft:
        velbase = { x: -0.5, y: -0.5 };
        break;
      default:
        velbase = { x: 0, y: 0 };
        break;
    }

    return velbase;
  }
}
