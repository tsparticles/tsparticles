import {
  type IColor,
  type IColorManager,
  type IHwb,
  type IHwba,
  type IOklcha,
  type IRangeColor,
  type IRgb,
  type IRgba,
  type IValueColor,
  defaultAlpha,
  getRangeValue,
  identity,
  none,
  parseAlpha,
  percentDenominator,
  rgbToOklch,
} from "@tsparticles/engine";

/** Indexes for HWB regex capture groups */
enum HwbIndexes {
  /** Hue component index */
  h = 1,
  /** Whiteness component index */
  w = 2,
  /** Blackness component index */
  b = 3,
  /** Alpha component index */
  a = 5,
}

const hwbRegex =
    /^hwba?\(\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+)(?:deg|rad|grad|turn)?)\s*[\s,]\s*(\d{1,3}(?:\.\d+)?)%\s*[\s,]\s*(\d{1,3}(?:\.\d+)?)%\s*((?:\s*[/,]\s*|\s+)(0|1|0?\.\d+|(\d{1,3})%)\s*)?\)$/i,
  maxDegree = 360,
  maxPercentage = 100,
  maxHwbValue = 255,
  gradsPerTurn = 400,
  radiansPerTurn = 2,
  hueSectors = 6,
  redOffset = 5,
  greenOffset = 3,
  blueOffset = 1,
  clampingMin = 0,
  clampingMax = 1,
  clampingReference = 4,
  unitValue = 1,
  degreesPerRadian = maxDegree / (Math.PI * radiansPerTurn),
  degreesPerGrad = maxDegree / gradsPerTurn,
  defaultFallbackValue = 0;

function parseHwbHue(input: string): number {
  const value = Number.parseFloat(input),
    unit = /(deg|rad|grad|turn)$/iu.exec(input)?.[1]?.toLowerCase();

  switch (unit) {
    case "rad":
      return value * degreesPerRadian;
    case "grad":
      return value * degreesPerGrad;
    case "turn":
      return value * maxDegree;
    default:
      return value;
  }
}

/**
 * Converts an HWB color value to RGB. Conversion formula
 * @param hwb - The HWB object
 * @returns The RGB representation
 */
function hwbToRgbFloat(hwb: IHwb): IRgb {
  const normalizedHue = (((hwb.h % maxDegree) + maxDegree) % maxDegree) / maxDegree,
    whiteness = hwb.w / maxPercentage,
    blackness = hwb.b / maxPercentage,
    totalWhitenessBlackness = whiteness + blackness;

  let red: number, green: number, blue: number;

  if (totalWhitenessBlackness >= unitValue) {
    const greyShade = whiteness / totalWhitenessBlackness;

    red = greyShade;
    green = greyShade;
    blue = greyShade;
  } else {
    const calculateChannel = (channelOffset: number): number => {
      const sectorPosition = (channelOffset + normalizedHue * hueSectors) % hueSectors,
        availableChroma = unitValue - whiteness - blackness,
        intensityFactor = Math.max(
          clampingMin,
          Math.min(sectorPosition, clampingReference - sectorPosition, clampingMax),
        );

      return unitValue - blackness - availableChroma * intensityFactor;
    };

    red = calculateChannel(redOffset);
    green = calculateChannel(greenOffset);
    blue = calculateChannel(blueOffset);
  }

  return {
    r: red * maxHwbValue,
    g: green * maxHwbValue,
    b: blue * maxHwbValue,
  };
}

function hwbToRgb(hwb: IHwb): IRgb {
  const color = hwbToRgbFloat(hwb);

  return {
    r: Math.round(color.r),
    g: Math.round(color.g),
    b: Math.round(color.b),
  };
}

/**
 * Converts an HWB color value and alpha transparency value to RGBA. Conversion formula
 * @param hwba - The hwba
 * @returns The RGBA representation
 */
function hwbaToRgba(hwba: IHwba): IRgba {
  return {
    a: hwba.a,
    ...hwbToRgb(hwba),
  };
}

/** HWB color manager */
export class HwbColorManager implements IColorManager {
  readonly #random: () => number;

  constructor(random: () => number) {
    this.#random = random;
  }

  /**
   * Checks if the input starts with hwb
   * @param input - The input value
   * @returns The boolean value
   */
  accepts(input: string): boolean {
    return input.toLowerCase().startsWith("hwb");
  }

  /**
   * Converts an IColor to RGB
   * @param color - The color
   * @returns The value, or undefined if not available
   */
  handleColor(color: IColor): IRgb | undefined {
    const colorValue = color.value as IValueColor,
      hwbColor = colorValue.hwb ?? (color.value as unknown as IHwb);

    if (!("h" in hwbColor) || !("w" in hwbColor) || !("b" in hwbColor)) {
      return;
    }

    return hwbToRgb(hwbColor);
  }

  handleColorOklch(color: IColor): IOklcha | undefined {
    const colorValue = color.value as IValueColor,
      hwbColor = colorValue.hwb ?? (color.value as unknown as IHwb);

    if (!("h" in hwbColor) || !("w" in hwbColor) || !("b" in hwbColor)) {
      return;
    }

    const alpha = (hwbColor as IHwb & { a?: number }).a ?? defaultAlpha;

    return { ...rgbToOklch(hwbToRgbFloat(hwbColor)), a: alpha };
  }

  /**
   * Converts an IRangeColor to RGB
   * @param color - The color
   * @returns The value, or undefined if not available
   */
  handleRangeColor(color: IRangeColor): IRgb | undefined {
    const colorValue = color.value as IValueColor,
      hwbColor = colorValue.hwb ?? (color.value as unknown as IHwb);

    if (!("h" in hwbColor) || !("w" in hwbColor) || !("b" in hwbColor)) {
      return;
    }

    return hwbToRgb({
      h: getRangeValue(hwbColor.h, this.#random),
      w: getRangeValue(hwbColor.w, this.#random),
      b: getRangeValue(hwbColor.b, this.#random),
    });
  }

  handleRangeColorOklch(color: IRangeColor): IOklcha | undefined {
    const colorValue = color.value as IValueColor,
      hwbColor = colorValue.hwb ?? (color.value as unknown as IHwb);

    if (!("h" in hwbColor) || !("w" in hwbColor) || !("b" in hwbColor)) {
      return;
    }

    const resolved = {
      h: getRangeValue(hwbColor.h, this.#random),
      w: getRangeValue(hwbColor.w, this.#random),
      b: getRangeValue(hwbColor.b, this.#random),
    };

    return { ...rgbToOklch(hwbToRgbFloat(resolved)), a: defaultAlpha };
  }

  /**
   * Parses an HWB color string to RGBA
   * @param input - The input value
   * @returns The value, or undefined if not available
   */
  parseString(input: string): IRgba | undefined {
    if (!this.accepts(input)) {
      return;
    }

    const result = hwbRegex.exec(input),
      minLength = 4;

    if (!result) {
      return;
    }

    const h = result[HwbIndexes.h],
      w = wValue(result[HwbIndexes.w]),
      b = wValue(result[HwbIndexes.b]),
      hwb = {
        a: result.length > minLength ? parseAlpha(result[HwbIndexes.a]) : defaultAlpha,
        h: h !== undefined ? parseHwbHue(h) : defaultFallbackValue,
        w,
        b,
      };

    return [hwb.h, hwb.w, hwb.b, hwb.a].every(Number.isFinite) &&
      hwb.w >= none &&
      hwb.w <= percentDenominator &&
      hwb.b >= none &&
      hwb.b <= percentDenominator &&
      hwb.a >= none &&
      hwb.a <= identity
      ? hwbaToRgba(hwb)
      : undefined;
  }

  parseStringOklch(input: string): IOklcha | undefined {
    if (!this.accepts(input)) {
      return;
    }

    const result = hwbRegex.exec(input),
      minLength = 4;

    if (!result) {
      return;
    }

    const h = result[HwbIndexes.h],
      hwb = {
        h: h !== undefined ? parseHwbHue(h) : defaultFallbackValue,
        w: wValue(result[HwbIndexes.w]),
        b: wValue(result[HwbIndexes.b]),
      },
      alpha = result.length > minLength ? parseAlpha(result[HwbIndexes.a]) : defaultAlpha;

    if (
      ![hwb.h, hwb.w, hwb.b, alpha].every(Number.isFinite) ||
      hwb.w < none ||
      hwb.w > percentDenominator ||
      hwb.b < none ||
      hwb.b > percentDenominator ||
      alpha < none ||
      alpha > identity
    ) {
      return;
    }

    return { ...rgbToOklch(hwbToRgbFloat(hwb)), a: alpha };
  }
}

function wValue(value: string | undefined): number {
  return value !== undefined ? Number.parseFloat(value) : defaultFallbackValue;
}
