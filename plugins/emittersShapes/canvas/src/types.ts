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
