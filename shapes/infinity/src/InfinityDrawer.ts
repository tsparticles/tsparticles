import {
  CachePolicy,
  type IShapeDrawData,
  type IShapeDrawer,
  type ITextureMetadata,
  TextureColorMode,
} from "@tsparticles/engine";
import { drawInfinity } from "./Utils.js";

export class InfinityDrawer implements IShapeDrawer {
  draw(data: IShapeDrawData): void {
    drawInfinity(data);
  }

  getDescriptor(): string {
    return "infinity";
  }

  getMetadata(): ITextureMetadata {
    return {
      cachePolicy: CachePolicy.Static,
      colorMode: TextureColorMode.Single,
    };
  }
}
