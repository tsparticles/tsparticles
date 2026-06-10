import { type IOptionLoader, type RecursivePartial, isNull, loadProperty } from "@tsparticles/engine";
import type { IBlend } from "../Interfaces/IBlend.js";

/**
 * [[include:Options/Blend.md]]
 */
export class Blend implements IBlend, IOptionLoader<IBlend> {
  /**
   * Blend enabling options
   */
  enable;

  /**
   * Canvas composite operation
   * values here: https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvasRenderingContext2D/globalCompositeOperation
   */
  mode: GlobalCompositeOperation;

  constructor() {
    this.mode = "destination-out";
    this.enable = false;
  }

  load(data?: RecursivePartial<IBlend>): void {
    if (isNull(data)) {
      return;
    }

    loadProperty(this, "mode", data.mode);
    loadProperty(this, "enable", data.enable);
  }
}
