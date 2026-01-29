import { ColorAnimation } from "./ColorAnimation.js";
import type { IHslAnimation } from "../Interfaces/IHslAnimation.js";
import type { IOptionLoader } from "../Interfaces/IOptionLoader.js";
import type { RecursivePartial } from "../../Types/RecursivePartial.js";
import { isNull } from "../../Utils/TypeUtils.js";

export class HslAnimation implements IHslAnimation, IOptionLoader<IHslAnimation> {
  readonly h = new ColorAnimation();
  readonly l = new ColorAnimation();
  readonly s = new ColorAnimation();

  load(data?: RecursivePartial<IHslAnimation>): void {
    if (isNull(data)) {
      return;
    }

    this.h.load(data.h);
    this.s.load(data.s);
    this.l.load(data.l);
  }
}
