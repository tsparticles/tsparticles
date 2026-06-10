import { OptionLoader, loadProperty } from "../../../../Utils/OptionsUtils.js";
import type { IMoveCenter } from "../../../Interfaces/Particles/Move/IMoveCenter.js";
import { PixelMode } from "../../../../Enums/Modes/PixelMode.js";
import type { RecursivePartial } from "../../../../Types/RecursivePartial.js";

export class MoveCenter extends OptionLoader<IMoveCenter> implements IMoveCenter {
  mode: PixelMode | keyof typeof PixelMode = PixelMode.percent;
  radius = 0;
  x = 50;
  y = 50;

  protected doLoad(data: RecursivePartial<IMoveCenter>): void {
    loadProperty(this, "x", data.x);
    loadProperty(this, "y", data.y);
    loadProperty(this, "mode", data.mode);
    loadProperty(this, "radius", data.radius);
  }
}
