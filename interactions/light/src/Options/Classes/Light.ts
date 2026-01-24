import { type IOptionLoader, type RecursivePartial, isNull } from "@tsparticles/engine";
import type { ILight } from "../Interfaces/ILight.js";
import { LightArea } from "./LightArea.js";
import { LightShadow } from "./LightShadow.js";

export class Light implements ILight, IOptionLoader<ILight> {
  area;
  shadow;

  constructor() {
    this.area = new LightArea();
    this.shadow = new LightShadow();
  }

  load(data?: RecursivePartial<ILight>): void {
    if (isNull(data)) {
      return;
    }

    this.area.load(data.area);
    this.shadow.load(data.shadow);
  }
}
