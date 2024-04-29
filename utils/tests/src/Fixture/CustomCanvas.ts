import { createCanvas } from "canvas";

export function createCustomCanvas(width: number, height: number) {
    const canvas = createCanvas(width, height);

    canvas.width = 100;
    canvas.height = 100;

    const augmentCanvas = canvas as any;

    augmentCanvas.tagName = "CANVAS";
    augmentCanvas.style = {
        setProperty(property: string, value: string | null, priority?: string) {
            this[property] = priority ? `${value} !important` : value;
        },
    };
    augmentCanvas.dataset = {};

    return canvas;
}
