import { type IShapeDrawData, type IShapeDrawer } from "@tsparticles/engine";
import { drawInfinity } from "./Utils.js";

/** Infinity shape drawer plugin */
export class InfinityDrawer implements IShapeDrawer {
  /**
   * Draws the infinity shape
   * @param data
   */
  draw(data: IShapeDrawData): void {
    drawInfinity(data);
  }
}
