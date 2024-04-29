import { createCanvas } from "canvas";

export function createCustomCanvas(width: number, height: number) {
    const canvas = createCanvas(width, height);
    canvas.width = 100;
    canvas.height = 100;

    const augmentCanvas = canvas as any;

    augmentCanvas.tagName = "CANVAS";

    return canvas;
}
