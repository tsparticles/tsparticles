import type { SingleOrMultiple } from "../../Types/SingleOrMultiple";

/**
 * Alpha Color
 * [[include:Color.md]]
 * @category Interfaces
 */
export interface IAlphaColor {
    /**
     * Color Alpha value
     */
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
    /**
     * Hue
     */
    h: number;

    /**
     * Saturation
     */
    s: number;

    /**
     * Luminance
     */
    l: number;
}

/**
 * @category Interfaces
 */
export interface IHsla extends IHsl, IAlphaColor {}

/**
 * @category Interfaces
 */
export interface IHsv {
    /**
     * Hue
     */
    h: number;

    /**
     * Saturation
     */
    s: number;

    /**
     * Value
     */
    v: number;
}

export interface IHsva extends IHsv, IAlphaColor {}

/**
 * @category Interfaces
 */
export interface IRgb {
    /**
     * Red
     */
    r: number;

    /**
     * Green
     */
    g: number;

    /**
     * Blue
     */
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
    /**
     * Rgb Value
     */
    rgb?: IRgb;

    /**
     * Hsl value
     */
    hsl?: IHsl;

    /**
     * Hsv value
     */
    hsv?: IHsv;
}
