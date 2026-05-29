import { type Canvas, createCanvas } from "canvas";

const zeroValue = 0;

/**
 * Minimal OffscreenCanvas test double backed by node-canvas.
 */
export class TestOffscreenCanvas {
  readonly #canvas: Canvas;

  constructor(width: number, height: number) {
    this.#canvas = createCanvas(width, height);
  }

  get height(): number {
    return this.#canvas.height;
  }

  set height(value: number) {
    this.#canvas.height = value;
  }

  get width(): number {
    return this.#canvas.width;
  }

  set width(value: number) {
    this.#canvas.width = value;
  }

  getContext(type: "2d", settings?: CanvasRenderingContext2DSettings): CanvasRenderingContext2D | null {
    return this.#canvas.getContext(type, settings) as unknown as CanvasRenderingContext2D | null;
  }
}

/**
 *
 * @param width
 * @param height
 */
export function createTestOffscreenCanvas(width: number, height: number): TestOffscreenCanvas {
  return new TestOffscreenCanvas(width, height);
}

/**
 *
 * @param target
 */
export function installTransferControlToOffscreen(target: object): void {
  Object.defineProperty(target, "transferControlToOffscreen", {
    configurable: true,
    value(this: { height?: number; width?: number }) {
      return createTestOffscreenCanvas(this.width ?? zeroValue, this.height ?? zeroValue);
    },
  });
}
