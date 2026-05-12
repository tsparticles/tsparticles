import { type IOptionLoader, type RecursivePartial, isNull } from "@tsparticles/engine";
import type { ILight } from "../Interfaces/ILight.js";
import { LightArea } from "./LightArea.js";
import { LightShadow } from "./LightShadow.js";

/** Light mode options class */
export class Light implements ILight, IOptionLoader<ILight> {
  /** The light area options */
  area;

  /** The light shadow options */
  shadow;

  constructor() {
    this.area = new LightArea();
    this.shadow = new LightShadow();
  }

  /** @inheritDoc */
  load(data?: RecursivePartial<ILight>): void {
    if (isNull(data)) {
      return;
    }

    this.area.load(data.area);
    this.shadow.load(data.shadow);
  }
}
