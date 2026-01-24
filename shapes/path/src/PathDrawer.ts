import { type Container, type IShapeDrawData, type IShapeDrawer, deepExtend } from "@tsparticles/engine";
import type { IShapePathData } from "./IShapePathData.js";
import type { PathParticle } from "./PathParticle.js";
import { drawPath } from "@tsparticles/path-utils";

export class PathDrawer implements IShapeDrawer<PathParticle> {
  readonly validTypes = ["path"] as const;

  draw(data: IShapeDrawData<PathParticle>): void {
    const { context, particle, radius } = data;

    if (!particle.pathData) {
      return;
    }

    drawPath(context, radius, particle.pathData);
  }

  particleInit(_container: Container, particle: PathParticle): void {
    const shape = particle.shapeData as IShapePathData | undefined;

    if (!shape) {
      return;
    }

    particle.pathData = deepExtend({}, shape) as IShapePathData;
  }
}
