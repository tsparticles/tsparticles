import {
  CachePolicy,
  type Container,
  type IShapeDrawData,
  type IShapeDrawer,
  type ITextureMetadata,
  TextureColorMode,
  deepExtend,
} from "@tsparticles/engine";
import type { IShapePathData } from "./IShapePathData.js";
import type { PathParticle } from "./PathParticle.js";
import { drawPath } from "@tsparticles/path-utils";

export class PathDrawer implements IShapeDrawer<PathParticle> {
  draw(data: IShapeDrawData<PathParticle>): void {
    const { context, particle, radius } = data;

    if (!particle.pathData) {
      return;
    }

    drawPath(context, radius, particle.pathData);
  }

  getDescriptor(particle: PathParticle): string {
    const pathData = particle.pathData ?? (particle.shapeData as IShapePathData | undefined);

    if (!pathData) {
      return "path";
    }

    return `path:${JSON.stringify(pathData)}`;
  }

  getMetadata(): ITextureMetadata {
    return {
      cachePolicy: CachePolicy.Static,
      colorMode: TextureColorMode.Single,
    };
  }

  particleInit(_container: Container, particle: PathParticle): void {
    const shape = particle.shapeData as IShapePathData | undefined;

    if (!shape) {
      return;
    }

    particle.pathData = deepExtend({}, shape) as IShapePathData;
  }
}
