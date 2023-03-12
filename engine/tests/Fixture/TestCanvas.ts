import type { Canvas } from "../../src";
import type { Container } from "../../src";
import { createCanvas } from "canvas";

export class TestCanvas {
    canvas: Canvas;
    private container: Container;

    constructor(container: Container, width: number, height: number) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const newCanvas = createCanvas(width, height) as any;
        newCanvas.dataset = {};
        newCanvas.offsetHeight = newCanvas.height;
        newCanvas.offsetWidth = newCanvas.width;
        this.container = container;
        this.canvas = container.canvas;
        this.canvas.loadCanvas(newCanvas as HTMLCanvasElement);
    }

    /**
     * If {@link container} is provided, then the new particle will be initialized with
     * this {@link container}. Otherwise the last-used {@link container} will be used.
     *
     * @param width
     * @param height
     * @param container
     */
    reset(width: number, height: number, container?: Container): void {
        if (container !== undefined) {
            this.container = container;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const newCanvas = createCanvas(width, height) as any;
        newCanvas.offsetHeight = newCanvas.height;
        newCanvas.offsetWidth = newCanvas.width;
        this.canvas = this.container.canvas;
        this.canvas.loadCanvas(newCanvas as HTMLCanvasElement);
    }
}
