import { type IOptionLoader, PixelMode, type RecursivePartial, isNull } from "@tsparticles/engine";
import type { IEmitterSize } from "../Interfaces/IEmitterSize.js";

/**
 * The emitter size options
 */
export class EmitterSize implements IEmitterSize, IOptionLoader<IEmitterSize> {
  /**
   * The emitter area height
   */
  height;
  /**
   * The emitter size mode (percent or precise)
   */
  mode: PixelMode | keyof typeof PixelMode;
  /**
   * The emitter area width
   */
  width;

  constructor() {
    this.mode = PixelMode.percent;
    this.height = 0;
    this.width = 0;
  }

  /**
   * Loads the emitter size options from the given data
   * @param data - the data to load from
   */
  load(data?: RecursivePartial<IEmitterSize>): void {
    if (isNull(data)) {
      return;
    }

    if (data.mode !== undefined) {
      this.mode = data.mode;
    }

    if (data.height !== undefined) {
      this.height = data.height;
    }

    if (data.width !== undefined) {
      this.width = data.width;
    }
  }
}
