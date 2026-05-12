import { type IOptionLoader, type RecursivePartial, isNull } from "@tsparticles/engine";
import type { ILightArea } from "../Interfaces/ILightArea.js";
import { LightGradient } from "./LightGradient.js";

/** Light area options class */
export class LightArea implements ILightArea, IOptionLoader<ILightArea> {
  /** The light gradient options */
  gradient;

  /** The light radius */
  radius;

  constructor() {
    this.gradient = new LightGradient();
    this.radius = 1000;
  }

  /** @inheritDoc */
  load(data?: RecursivePartial<ILightArea>): void {
    if (isNull(data)) {
      return;
    }

    this.gradient.load(data.gradient);

    if (data.radius !== undefined) {
      this.radius = data.radius;
    }
  }
}
