import type { SingleOrMultiple } from "../../Types";

export interface IAlphaColor {
    /** alpha */
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
    value: SingleOrMultiple<IValueColor | IRgb | IHsl | IHsv | string>;
}

/**
 * @category Interfaces
 */
export interface IHsl {
    /** hue */
    h: number;
    /** saturation */
    s: number;
    /** lightness */
    l: number;
}

/**
 * @category Interfaces
 */
export interface IHsla extends IHsl, IAlphaColor {}

export interface IHsv {
    /** hue */
    h: number;
    /** saturation */
    s: number;
    /** value */
    v: number;
}

export interface IHsva extends IHsv, IAlphaColor {}

/**
 * @category Interfaces
 */
export interface IRgb {
    /** red */
    r: number;
    /** green */
    g: number;
    /** blue */
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
