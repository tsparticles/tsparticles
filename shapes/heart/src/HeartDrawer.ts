import type { IShapeDrawData, IShapeDrawer } from "@tsparticles/engine";
import { drawHeart } from "./Utils.js";

/** Heart shape drawer plugin */
export class HeartDrawer implements IShapeDrawer {
  /**
   * Draws the heart shape
   * @param data
   */
  draw(data: IShapeDrawData): void {
    drawHeart(data);
  }
}
