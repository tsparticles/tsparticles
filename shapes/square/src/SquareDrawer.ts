import type { IShapeDrawData, IShapeDrawer } from "@tsparticles/engine";
import { drawSquare } from "./Utils.js";

const sides = 4;

/** Square shape drawer plugin */
export class SquareDrawer implements IShapeDrawer {
  /**
   * Draws the square shape
   * @param data - The data to handle
   */
  draw(data: IShapeDrawData): void {
    drawSquare(data);
  }

  /**
   * Gets the number of sides for this shape
   * @returns The numeric value
   */
  getSidesCount(): number {
    return sides;
  }
}
