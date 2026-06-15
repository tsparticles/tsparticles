import type { IShapeDrawData, IShapeDrawer } from "@tsparticles/engine";
import { drawLine } from "./Utils.js";

const sides = 1;

/** Line shape drawer plugin */
export class LineDrawer implements IShapeDrawer {
  /**
   * Draws the line shape
   * @param data - The data to handle
   */
  draw(data: IShapeDrawData): void {
    drawLine(data);
  }

  /**
   * Gets the number of sides for this shape
   * @returns The numeric value
   */
  getSidesCount(): number {
    return sides;
  }
}
