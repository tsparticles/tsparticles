import type { IRgba } from "@tsparticles/engine";

export type CanvasPixelData = {
    height: number;
    pixels: IRgba[][];
    width: number;
};

export type TextLineData = {
    height: number;
    measure: TextMetrics;
    text: string;
    width: number;
};
