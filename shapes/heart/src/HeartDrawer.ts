import type { IShapeDrawData, IShapeDrawer } from "@tsparticles/engine";
import { drawHeart } from "./Utils.js";

export class HeartDrawer implements IShapeDrawer {
  draw(data: IShapeDrawData): void {
    drawHeart(data);
  }
}
