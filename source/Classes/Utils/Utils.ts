"use strict";

import { ICoordinates } from "../../Interfaces/ICoordinates";
import { IHsl } from "../../Interfaces/IHsl";
import { IRgb } from "../../Interfaces/IRgb";
import { IOptions } from "../../Interfaces/IOptions";
import { IColor } from "../../Interfaces/IColor";
import { MoveDirection } from "../../Enums/MoveDirection";

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

  public static getParticleVelBase(options: IOptions): ICoordinates {
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

  public static getParticleColor(options: IOptions, color: { value: string[] | IColor | string }): IColor {
    const res: IColor = {};

    if (typeof (color.value) === "object") {
      if (color.value instanceof Array) {
        const arr = options.particles.color.value as string[];
        const color_selected = color.value[Math.floor(Math.random() * arr.length)];

        res.rgb = Utils.hexToRgb(color_selected);
      } else {
        const rgbColor = color.value as IRgb;

        if (rgbColor) {
          res.rgb = {
            b: rgbColor.b,
            g: rgbColor.g,
            r: rgbColor.r,
          };
        }

        const hslColor = color.value as IHsl;

        if (hslColor) {
          res.hsl = {
            h: hslColor.h,
            l: hslColor.l,
            s: hslColor.s,
          };
        }
      }
    } else if (typeof (color.value) === "string") {
      if (color.value === "random") {
        res.rgb = {
          b: Math.floor(Math.random() * 256),
          g: Math.floor(Math.random() * 256),
          r: Math.floor(Math.random() * 256),
        };
      } else {
        res.rgb = Utils.hexToRgb(color.value);
      }
    }

    return res;
  }
}
