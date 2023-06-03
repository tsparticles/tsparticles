import type { RangeValue } from "../../Types/RangeValue";
import type { SingleOrMultiple } from "../../Types/SingleOrMultiple";

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
 * Color
 * [[include:Color.md]]
 */
export interface IRangeColor {
    /**
     * Color value, can be a single or an array of {@link IValueColor}, {@link IRgb}, {@link IHsl} or string
     */
    value: SingleOrMultiple<IRangeValueColor | IRangeRgb | IRangeHsl | IRangeHsv | SingleOrMultiple<string>>;
}

/**
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
 */
export interface IHsla extends IHsl, IAlphaColor {}

/**
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
 */
export interface IRgba extends IRgb, IAlphaColor {}

/**
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
