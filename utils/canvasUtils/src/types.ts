import type { IRgba } from "@tsparticles/engine";

export interface CanvasPixelData {
  /** Color space of the RGBA-unorm8 pixel channels; older/unavailable metadata defaults to sRGB. */
  colorSpace?: "display-p3" | "srgb";
  height: number;
  /** Pixel channels use 0–255 RGB and 0–1 alpha. HDR headroom is not retained. */
  pixels: IRgba[][];
  width: number;
}

export interface TextLineData {
  height: number;
  measure: TextMetrics;
  text: string;
  width: number;
}

export interface ITextDataOptions {
  color: string;
  font: ITextDataFontOptions;
  lines: ITextDataLinesOptions;
  text: string;
}

export interface ITextDataFontOptions {
  family: string;
  size: string | number;
  style: string;
  variant: string;
  weight: string;
}

export interface ITextDataLinesOptions {
  separator: string;
  spacing: number;
}
