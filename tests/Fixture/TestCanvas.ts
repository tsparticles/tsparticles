import { createCanvas } from 'canvas';

import { Container } from "../../src/Core/Container";
import { Canvas } from "../../src/Core/Canvas";

export class TestCanvas {
    private container: Container;
    public canvas: Canvas;

    constructor(container: Container, width: number, height: number) {
        let newCanvas = createCanvas(width, height) as any;
        newCanvas.offsetHeight = newCanvas.height;
        newCanvas.offsetWidth = newCanvas.width;
        this.container = container;
        this.canvas = new Canvas(this.container);
        this.canvas.loadCanvas(newCanvas as HTMLCanvasElement);
        this.container.canvas = this.canvas;
    }

    /**
     * If [[container]] is provided, then the new particle will be initialized with
     * this [[container]]. Otherwise the last-used [[container]] will be used.
     *
     * @param width
     * @param height
     * @param container
     */
    public reset(width: number, height: number, container?: Container): void {
        if(container !== undefined) {
            this.container = container;
        }
        let newCanvas = createCanvas(width, height) as any;
        newCanvas.offsetHeight = newCanvas.height;
        newCanvas.offsetWidth = newCanvas.width;
        this.canvas = new Canvas(this.container);
        this.canvas.loadCanvas(newCanvas as HTMLCanvasElement);
        this.container.canvas = this.canvas;
    }
}