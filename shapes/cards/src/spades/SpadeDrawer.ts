import {
  CachePolicy,
  type IShapeDrawData,
  type IShapeDrawer,
  type ITextureMetadata,
  TextureColorMode,
} from "@tsparticles/engine";
import { drawPath } from "@tsparticles/path-utils";
import { paths } from "../paths.js";

export class SpadeDrawer implements IShapeDrawer {
  draw(data: IShapeDrawData): void {
    const { context, radius } = data;

    drawPath(context, radius, paths.spades);
  }

  getDescriptor(): string {
    return "spade";
  }

  getMetadata(): ITextureMetadata {
    return {
      cachePolicy: CachePolicy.Static,
      colorMode: TextureColorMode.Single,
    };
  }
}
