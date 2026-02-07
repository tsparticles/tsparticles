import {
  CachePolicy,
  type IShapeDrawData,
  type IShapeDrawer,
  type ITextureMetadata,
  TextureColorMode,
} from "@tsparticles/engine";
import { drawHeart } from "./Utils.js";

export class HeartDrawer implements IShapeDrawer {
  draw(data: IShapeDrawData): void {
    drawHeart(data);
  }

  getDescriptor(): string {
    return "heart";
  }

  getMetadata(): ITextureMetadata {
    return {
      cachePolicy: CachePolicy.Static,
      colorMode: TextureColorMode.Single,
    };
  }
}
