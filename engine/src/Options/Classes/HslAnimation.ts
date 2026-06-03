import { hMax, hMin, lMax, lMin, sMax, sMin } from "../../Core/Utils/Constants.js";
import { ColorAnimation } from "./ColorAnimation.js";
import type { IHslAnimation } from "../Interfaces/IHslAnimation.js";
import { OptionLoader } from "../../Utils/OptionsUtils.js";
import type { RecursivePartial } from "../../Types/RecursivePartial.js";

export class HslAnimation extends OptionLoader<IHslAnimation> implements IHslAnimation {
  readonly h = new ColorAnimation(hMin, hMax);
  readonly l = new ColorAnimation(lMin, lMax);
  readonly s = new ColorAnimation(sMin, sMax);

  doLoad(data: RecursivePartial<IHslAnimation>): void {
    this.h.load(data.h);
    this.s.load(data.s);
    this.l.load(data.l);
  }
}
