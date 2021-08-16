import type { SingleOrMultiple } from "../../Types";

export interface IAlphaColor {
    a: number;
}

/**
 * Color
 * [[include:Color.md]]
 * @category Interfaces
 */
export interface IColor {
    /**
     * Color value, can be a single or an array of [[IValueColor]], [[IRgb]], [[IHsl]] or string
     */
    value: SingleOrMultiple<IValueColor | IRgb | IHsl | IHsv | SingleOrMultiple<string>>;
}

/**
 * @category Interfaces
 */
export interface IHsl {
    h: number;
    s: number;
    l: number;
}

/**
 * @category Interfaces
 */
export interface IHsla extends IHsl, IAlphaColor {}

export interface IHsv {
    h: number;
    s: number;
    v: number;
}

export interface IHsva extends IHsv, IAlphaColor {}

/**
 * @category Interfaces
 */
export interface IRgb {
    r: number;
    g: number;
    b: number;
}

/**
 * @category Interfaces
 */
export interface IRgba extends IRgb, IAlphaColor {}

/**
 * @category Interfaces
 */
export interface IValueColor {
    rgb?: IRgb;
    hsl?: IHsl;
    hsv?: IHsv;
}
