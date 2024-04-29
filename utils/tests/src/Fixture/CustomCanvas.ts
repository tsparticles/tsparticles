/* eslint-disable @typescript-eslint/no-explicit-any */
import { type Canvas, createCanvas } from "canvas";

/**
 *
 * @param width -
 * @param height -
 * @returns the custom canvas
 */
export function createCustomCanvas(width: number, height: number): Canvas {
    const canvas = createCanvas(width, height);

    canvas.width = 100;
    canvas.height = 100;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const augmentCanvas = canvas as any;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    augmentCanvas.tagName = "CANVAS";
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    augmentCanvas.style = {
        setProperty(property: string, value: string | null, priority?: string): void {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            this[property] = priority ? `${value} !important` : value;
        },
    };
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    augmentCanvas.dataset = {};

    return canvas;
}
