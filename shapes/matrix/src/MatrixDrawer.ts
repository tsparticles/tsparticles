import type { IShapeDrawData, IShapeDrawer } from "@tsparticles/engine";
import { drawMatrix } from "./Utils.js";

export class MatrixDrawer implements IShapeDrawer {
  draw(data: IShapeDrawData): void {
    drawMatrix(data);
  }
}
