import { type Container, type IShapeDrawData, type IShapeDrawer, deepExtend } from "@tsparticles/engine";
import type { IShapePathData } from "./IShapePathData.js";
import type { PathParticle } from "./PathParticle.js";
import { drawPath } from "@tsparticles/path-utils";

/** SVG path shape drawer plugin */
export class PathDrawer implements IShapeDrawer<PathParticle> {
  /**
   * Draws the SVG path shape
   * @param data
   */
  draw(data: IShapeDrawData<PathParticle>): void {
    const { context, particle, radius } = data;

    if (!particle.pathData) {
      return;
    }

    drawPath(context, radius, particle.pathData);
  }

  /**
   * Initializes the path data for the particle
   * @param _container
   * @param particle
   */
  particleInit(_container: Container, particle: PathParticle): void {
    const shape = particle.shapeData as IShapePathData | undefined;

    if (!shape) {
      return;
    }

    particle.pathData = deepExtend({}, shape) as IShapePathData;
  }
}
