import { safeDocument } from "../../Utils/Utils.js";

const maxPoolSizePerKey = 8,
  identity = 1,
  zero = 0;

/**
 * Pool for HTMLCanvasElement to reduce garbage collection pressure
 */
export class CanvasPool {
  private readonly _pool = new Map<string, HTMLCanvasElement[]>();

  /**
   * Clears the pool
   */
  clear(): void {
    this._pool.clear();
  }

  /**
   * Gets a canvas from the pool or creates a new one if needed
   * @param width - canvas width in pixels
   * @param height - canvas height in pixels
   * @returns a canvas element with the requested size
   */
  getCanvas(width: number, height: number): HTMLCanvasElement {
    const key = this._getKey(width, height),
      list = this._pool.get(key);

    if (list?.length) {
      const canvas = list.pop();

      if (!canvas) {
        return this._createCanvas(width, height);
      }

      canvas.width = width;
      canvas.height = height;

      return canvas;
    }

    return this._createCanvas(width, height);
  }

  /**
   * Returns a canvas to the pool for reuse
   * @param canvas - canvas to return
   */
  returnCanvas(canvas: HTMLCanvasElement): void {
    const { height, width } = canvas,
      key = this._getKey(width, height),
      list = this._pool.get(key) ?? [];

    if (list.length >= maxPoolSizePerKey) {
      return;
    }

    const context = canvas.getContext("2d");

    if (context) {
      context.clearRect(zero, zero, width, height);
      context.globalAlpha = identity;
      context.globalCompositeOperation = "source-over";
      context.setTransform(identity, zero, zero, identity, zero, zero);
    }

    list.push(canvas);
    this._pool.set(key, list);
  }

  private readonly _createCanvas = (width: number, height: number): HTMLCanvasElement => {
    const canvas = safeDocument().createElement("canvas");

    canvas.width = width;
    canvas.height = height;

    return canvas;
  };

  private readonly _getKey = (width: number, height: number): string => `${width}x${height}`;
}
