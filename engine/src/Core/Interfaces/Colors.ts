import type { RangeValue } from "../../Types/RangeValue";
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
 * Color
 * [[include:Color.md]]
 * @category Interfaces
 */
export interface IRangeColor {
    /**
     * Color value, can be a single or an array of [[IValueColor]], [[IRgb]], [[IHsl]] or string
     */
    value: SingleOrMultiple<IRangeValueColor | IRangeRgb | IRangeHsl | IRangeHsv | SingleOrMultiple<string>>;
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
     * Luminance
     */
    l: number;

    /**
     * Saturation
     */
    s: number;
}

/**
 * @category Interfaces
 */
export interface IRangeHsl {
    /**
     * Hue
     */
    h: RangeValue;

    /**
     * Luminance
     */
    l: RangeValue;

    /**
     * Saturation
     */
    s: RangeValue;
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

/**
 * @category Interfaces
 */
export interface IRangeHsv {
    /**
     * Hue
     */
    h: RangeValue;

    /**
     * Saturation
     */
    s: RangeValue;

    /**
     * Value
     */
    v: RangeValue;
}

export interface IHsva extends IHsv, IAlphaColor {}

/**
 * @category Interfaces
 */
export interface IRgb {
    /**
     * Blue
     */
    b: number;

    /**
     * Green
     */
    g: number;

    /**
     * Red
     */
    r: number;
}

/**
 * @category Interfaces
 */
export interface IRangeRgb {
    /**
     * Blue
     */
    b: RangeValue;

    /**
     * Green
     */
    g: RangeValue;

    /**
     * Red
     */
    r: RangeValue;
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
     * Hsl value
     */
    hsl?: IHsl;

    /**
     * Hsv value
     */
    hsv?: IHsv;

    /**
     * Rgb Value
     */
    rgb?: IRgb;
}

/**
 * @category Interfaces
 */
export interface IRangeValueColor {
    /**
     * Hsl value
     */
    hsl?: IRangeHsl;

    /**
     * Hsv value
     */
    hsv?: IRangeHsv;

    /**
     * Rgb Value
     */
    rgb?: IRangeRgb;
}
