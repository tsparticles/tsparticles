"use strict";

import {ICoordinates} from "../../Interfaces/ICoordinates";
import {IHsl} from "../../Interfaces/IHsl";
import {IRgb} from "../../Interfaces/IRgb";
import {IOptions} from "../../Interfaces/IOptions";
import {IColor} from "../../Interfaces/IColor";
import {MoveDirection} from "../../Enums/MoveDirection";

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

    /**
     * Generate a random RGBA color
     */
    public static getRandomColorRGBA(min?: number): IRgb {
        return {
            b: Math.floor(Math.random() * 255 + (min || 0)),
            g: Math.floor(Math.random() * 255 + (min || 0)),
            r: Math.floor(Math.random() * 255 + (min || 0)),
        };
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

    public static mixComponents(comp1: number, comp2: number, weight1: number, weight2: number): number {
        return (comp1 * weight1 + comp2 * weight2) / (weight1 + weight2);
    }

    public static getStyleFromColor(color: IRgb): string {
        return `rgba(${Math.floor(color.r)}, ${Math.floor(color.g)}, ${Math.floor(color.b)}, 0.4)`;
    }

    public static getParticleVelBase(options: IOptions): ICoordinates {
        let velocityBase: ICoordinates;

        switch (options.particles.move.direction) {
            case MoveDirection.top:
                velocityBase = {x: 0, y: -1};
                break;
            case MoveDirection.topRight:
                velocityBase = {x: 0.5, y: -0.5};
                break;
            case MoveDirection.right:
                velocityBase = {x: 1, y: -0};
                break;
            case MoveDirection.bottomRight:
                velocityBase = {x: 0.5, y: 0.5};
                break;
            case MoveDirection.bottom:
                velocityBase = {x: 0, y: 1};
                break;
            case MoveDirection.bottomLeft:
                velocityBase = {x: -0.5, y: 1};
                break;
            case MoveDirection.left:
                velocityBase = {x: -1, y: 0};
                break;
            case MoveDirection.topLeft:
                velocityBase = {x: -0.5, y: -0.5};
                break;
            default:
                velocityBase = {x: 0, y: 0};
                break;
        }

        return velocityBase;
    }

    public static getParticleColor(options: IOptions, color: { value: string[] | IColor | string }): IColor {
        const res: IColor = {};

        if (typeof (color.value) === "object") {
            if (color.value instanceof Array) {
                const arr = options.particles.color.value as string[];
                const colorSelected = color.value[Math.floor(Math.random() * arr.length)];

                res.rgb = Utils.hexToRgb(colorSelected);
            } else {
                const rgbColor = color.value as IRgb;

                if (rgbColor.r !== undefined) {
                    res.rgb = {
                        b: rgbColor.b,
                        g: rgbColor.g,
                        r: rgbColor.r,
                    };
                }

                const hslColor = color.value as IHsl;

                if (hslColor.h !== undefined) {
                    res.hsl = {
                        h: hslColor.h,
                        l: hslColor.l,
                        s: hslColor.s,
                    };
                }
            }
        } else {
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
