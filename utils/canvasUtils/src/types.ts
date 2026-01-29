import type { IRgba } from "@tsparticles/engine";

export interface CanvasPixelData {
  height: number;
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
