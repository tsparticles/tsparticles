import type { IShapeDrawData, IShapeDrawer } from "@tsparticles/engine";
import type { MatrixParticle } from "./MatrixParticle.js";
import { drawMatrix } from "./Utils.js";

/** Matrix shape drawer plugin */
export class MatrixDrawer implements IShapeDrawer<MatrixParticle> {
  /**
   * Draws the matrix character shape
   * @param data
   */
  draw(data: IShapeDrawData<MatrixParticle>): void {
    drawMatrix(data);
  }
}
