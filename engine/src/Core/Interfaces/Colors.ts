import type { RangeValue } from "../../Types/RangeValue.js";
import type { SingleOrMultiple } from "../../Types/SingleOrMultiple.js";

/**
 * Alpha Color
 * [[include:Color.md]]
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
 */
export interface IColor {
    /**
     * Color value, can be a single or an array of {@link IValueColor}, {@link IRgb}, {@link IHsl} or string
     */
    value: SingleOrMultiple<IValueColor | IRgb | IHsl | IHsv | SingleOrMultiple<string>>;
}

/**
 * Range Color
 * [[include:Color.md]]
 */
export interface IRangeColor {
    /**
     * Color value, can be a single or an array of {@link IValueColor}, {@link IRgb}, {@link IHsl} or string
     */
    value: SingleOrMultiple<IRangeValueColor | IRangeRgb | IRangeHsl | IRangeHsv | SingleOrMultiple<string>>;
}

/**
 * HSL Color
 * [[include:Color.md]]
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
 * Range HSL Color
 * [[include:Color.md]]
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
 * HSLA Color
 * [[include:Color.md]]
 */
export interface IHsla extends IHsl, IAlphaColor {}

/**
 * HSV Color
 * [[include:Color.md]]
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
 * Range HSV Color
 * [[include:Color.md]]
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

/**
 * HSVA Color
 * [[include:Color.md]]
 */
export interface IHsva extends IHsv, IAlphaColor {}

/**
 * RGB Color
 * [[include:Color.md]]
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
 * Range RGB Color
 * [[include:Color.md]]
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
 * RGBA Color
 * [[include:Color.md]]
 */
export interface IRgba extends IRgb, IAlphaColor {}

/**
 * Mixed Value Color
 * [[include:Color.md]]
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
 * Range Mixed Value Color
 * [[include:Color.md]]
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
