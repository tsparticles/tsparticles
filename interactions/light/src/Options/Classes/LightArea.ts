import { type IOptionLoader, type RecursivePartial, isNull, loadProperty } from "@tsparticles/engine";
import type { ILightArea } from "../Interfaces/ILightArea.js";
import { LightGradient } from "./LightGradient.js";

/** Light area options class */
export class LightArea implements ILightArea, IOptionLoader<ILightArea> {
  /** The light gradient options */
  readonly gradient = new LightGradient();
  /** The light radius */
  radius = 1000;

  /** @inheritDoc */
  load(data?: RecursivePartial<ILightArea>): void {
    if (isNull(data)) {
      return;
    }

    this.gradient.load(data.gradient);

    loadProperty(this, "radius", data.radius);
  }
}
