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
    value: SingleOrMultiple<
        IValueColor | IRgb | IHsl | IHsv | IHwb | ILab | ILch | IOklab | IOklch | SingleOrMultiple<string>
    >;
}

/**
 * Range Color
 * [[include:Color.md]]
 */
export interface IRangeColor {
    /**
     * Color value, can be a single or an array of {@link IValueColor}, {@link IRgb}, {@link IHsl} or string
     */
    value: SingleOrMultiple<
        | IRangeValueColor
        | IRangeRgb
        | IRangeHsl
        | IRangeHsv
        | IRangeHwb
        | IRangeLab
        | IRangeLch
        | IRangeOklab
        | SingleOrMultiple<string>
    >;
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
 * OKLCH Color
 * [[include:Color.md]]
 */
export interface IOklch {
    /**
     * Chroma
     */
    c: number;

    /**
     * Hue
     */
    h: number;

    /**
     * Lightness
     */
    l: number;
}

/**
 * LCH Color
 * [[include:Color.md]]
 */
export interface ILch {
    /**
     * Chroma
     */
    c: number;

    /**
     * Hue
     */
    h: number;

    /**
     * Lightness
     */
    l: number;
}

/**
 * Range OKLCH Color
 * [[include:Color.md]]
 */
export interface IRangeOklch {
    /**
     * Chroma
     */
    c: RangeValue;

    /**
     * Hue
     */
    h: RangeValue;

    /**
     * Lightness
     */
    l: RangeValue;
}

/**
 * Range LCH Color
 * [[include:Color.md]]
 */
export interface IRangeLch {
    /**
     * Chroma
     */
    c: RangeValue;

    /**
     * Hue
     */
    h: RangeValue;

    /**
     * Lightness
     */
    l: RangeValue;
}

/**
 * OKLCHA Color
 * [[include:Color.md]]
 */
export interface IOklcha extends IOklch, IAlphaColor {}

/**
 * LCHA Color
 * [[include:Color.md]]
 */
export interface ILcha extends ILch, IAlphaColor {}

/**
 * OKLAB Color
 * [[include:Color.md]]
 */
export interface IOklab {
    /**
     * a axis (green–red)
     */
    aAxis: number;

    /**
     * b axis (blue–yellow)
     */
    bAxis: number;

    /**
     * Lightness
     */
    l: number;
}

/**
 * Range OKLAB Color
 * [[include:Color.md]]
 */
export interface IRangeOklab {
    /**
     * a axis (green–red)
     */
    aAxis: RangeValue;

    /**
     * b axis (blue–yellow)
     */
    bAxis: RangeValue;

    /**
     * Lightness
     */
    l: RangeValue;
}

/**
 * OKLABA Color
 * [[include:Color.md]]
 */
export interface IOklaba extends IOklab, IAlphaColor {}

/**
 * OKLAB Color
 * [[include:Color.md]]
 */
export interface ILab {
    /**
     * a axis (green–red)
     */
    aAxis: number;

    /**
     * b axis (blue–yellow)
     */
    bAxis: number;

    /**
     * Lightness
     */
    l: number;
}

/**
 * Range OKLAB Color
 * [[include:Color.md]]
 */
export interface IRangeLab {
    /**
     * a axis (green–red)
     */
    aAxis: RangeValue;

    /**
     * b axis (blue–yellow)
     */
    bAxis: RangeValue;

    /**
     * Lightness
     */
    l: RangeValue;
}

/**
 * OKLABA Color
 * [[include:Color.md]]
 */
export interface ILaba extends IOklab, IAlphaColor {}

/**
 * HWB Color
 * [[include:Color.md]]
 */
export interface IHwb {
    b: number;
    h: number;
    w: number;
}

/**
 * HWBA Color
 * [[include:Color.md]]
 */
export interface IHwba extends IHwb, IAlphaColor {}

/**
 * Range HWB Color
 */
export interface IRangeHwb {
    b: RangeValue;
    h: RangeValue;
    w: RangeValue;
}

/**
 * Range HWBA Color
 */
export interface IRangeHwba extends IRangeHwb, IAlphaColor {}

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
     * HWB value
     */
    hwb?: IHwb;

    /**
     * Lab Value
     */
    lab?: ILab;

    /**
     * Lch Value
     */
    lch?: ILch;

    /**
     * Oklab Value
     */
    oklab?: IOklab;

    /**
     * Oklch Value
     */
    oklch?: IOklch;

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
     * HWB value
     */
    hwb?: IRangeHwb;

    /**
     * Lab Value
     */
    lab?: IRangeLab;

    /**
     * Lch Value
     */
    lch?: IRangeLch;

    /**
     * Oklab Value
     */
    oklab?: IRangeOklab;

    /**
     * Oklch Value
     */
    oklch?: IRangeOklch;

    /**
     * Rgb Value
     */
    rgb?: IRangeRgb;
}
