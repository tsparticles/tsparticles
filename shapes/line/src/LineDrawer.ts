import type { IShapeDrawData, IShapeDrawer } from "@tsparticles/engine";
import { drawLine } from "./Utils.js";

const sides = 1;

/** Line shape drawer plugin */
export class LineDrawer implements IShapeDrawer {
  /**
   * Draws the line shape
   * @param data
   */
  draw(data: IShapeDrawData): void {
    drawLine(data);
  }

  /** Gets the number of sides for this shape */
  getSidesCount(): number {
    return sides;
  }
}
