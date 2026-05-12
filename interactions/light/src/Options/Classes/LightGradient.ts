import { type IOptionLoader, OptionsColor, type RecursivePartial, isNull } from "@tsparticles/engine";
import type { ILightGradient } from "../Interfaces/ILightGradient.js";

/** Light gradient options class */
export class LightGradient implements ILightGradient, IOptionLoader<ILightGradient> {
  /** The start color of the gradient */
  start;

  /** The stop color of the gradient */
  stop;

  constructor() {
    this.start = new OptionsColor();
    this.stop = new OptionsColor();

    this.start.value = "#ffffff";
    this.stop.value = "#000000";
  }

  /** @inheritDoc */
  load(data?: RecursivePartial<ILightGradient>): void {
    if (isNull(data)) {
      return;
    }

    this.start = OptionsColor.create(this.start, data.start);
    this.stop = OptionsColor.create(this.stop, data.stop);
  }
}
