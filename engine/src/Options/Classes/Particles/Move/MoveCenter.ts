import { OptionLoader, loadProperty } from "../../../../Utils/OptionsUtils.js";
import type { IMoveCenter } from "../../../Interfaces/Particles/Move/IMoveCenter.js";
import { PixelMode } from "../../../../Enums/Modes/PixelMode.js";
import type { RecursivePartial } from "../../../../Types/RecursivePartial.js";

export class MoveCenter extends OptionLoader<IMoveCenter> implements IMoveCenter {
  mode: PixelMode | keyof typeof PixelMode;
  radius;
  x;
  y;

  constructor() {
    super();
    this.x = 50;
    this.y = 50;
    this.mode = PixelMode.percent;
    this.radius = 0;
  }

  protected doLoad(data: RecursivePartial<IMoveCenter>): void {
    loadProperty(this, "x", data.x);
    loadProperty(this, "y", data.y);
    loadProperty(this, "mode", data.mode);
    loadProperty(this, "radius", data.radius);
  }
}
