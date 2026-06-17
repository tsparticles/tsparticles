import { type Container, type IShapeDrawData, type IShapeDrawer, deepExtend } from "@tsparticles/engine";
import type { IShapePathData } from "./IShapePathData.js";
import type { PathParticle } from "./PathParticle.js";
import { drawPath } from "@tsparticles/path-utils";

/** SVG path shape drawer plugin */
export class PathDrawer implements IShapeDrawer<PathParticle> {
  /**
   * Draws the SVG path shape
   * @param data - The data to handle
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
   * @param _container - The container to handle
   * @param particle - The particle to process
   */
  particleInit(_container: Container, particle: PathParticle): void {
    const shape = particle.shapeData as IShapePathData | undefined;

    if (!shape) {
      return;
    }

    particle.pathData = deepExtend({}, shape) as IShapePathData;
  }
}
