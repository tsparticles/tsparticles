import { type IShapeDrawData, type IShapeDrawer } from "@tsparticles/engine";
import { drawSquircle } from "./Utils.js";

export class SquircleDrawer implements IShapeDrawer {
  draw(data: IShapeDrawData): void {
    drawSquircle(data);
  }
}
