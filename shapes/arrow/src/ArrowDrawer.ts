import {
  CachePolicy,
  type Container,
  type IShapeDrawData,
  type IShapeDrawer,
  type ITextureMetadata,
  TextureColorMode,
  getRangeValue,
} from "@tsparticles/engine";
import type { ArrowParticle } from "./ArrowParticle.js";
import type { IArrowData } from "./IArrowData.js";
import { drawArrow } from "./Utils.js";

const defaultHeightFactor = 0.5,
  defaultHeadWidthFactor = 0.2,
  defaultBodyHeightFactor = 0.5,
  defaultPadding = 1.6;

export class ArrowDrawer implements IShapeDrawer<ArrowParticle> {
  draw(data: IShapeDrawData<ArrowParticle>): void {
    drawArrow(data);
  }

  getDescriptor(particle: ArrowParticle): string {
    return `arrow:${particle.heightFactor ?? ""}:${particle.headWidthFactor ?? ""}:${particle.bodyHeightFactor ?? ""}`;
  }

  getMetadata(particle: ArrowParticle): ITextureMetadata {
    const radius = particle.getRadius(),
      padding = radius * defaultPadding;

    return {
      cachePolicy: CachePolicy.Static,
      colorMode: TextureColorMode.Single,
      padding,
    };
  }

  particleInit(_container: Container, particle: ArrowParticle): void {
    const shapeData = particle.shapeData as IArrowData | undefined;

    particle.heightFactor = getRangeValue(shapeData?.heightFactor ?? defaultHeightFactor);
    particle.headWidthFactor = getRangeValue(shapeData?.headWidthFactor ?? defaultHeadWidthFactor);
    particle.bodyHeightFactor = getRangeValue(shapeData?.bodyHeightFactor ?? defaultBodyHeightFactor);
  }
}
