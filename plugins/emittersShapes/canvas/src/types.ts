import type { IRgba } from "@tsparticles/engine";

/** Canvas pixel data extracted from an image or canvas element */
export interface CanvasPixelData {
  /** The pixel data height */
  height: number;
  /** The pixel data as a 2D array of RGBA values */
  pixels: IRgba[][];
  /** The pixel data width */
  width: number;
}

/** Text line rendering data */
export interface TextLineData {
  /** The line height */
  height: number;
  /** The text measurement data */
  measure: TextMetrics;
  /** The line text content */
  text: string;
  /** The line width */
  width: number;
}
