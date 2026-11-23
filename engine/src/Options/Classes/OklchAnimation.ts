import { ColorAnimation } from "./ColorAnimation.js";
import type { IOklchAnimation } from "../Interfaces/IOklchAnimation.js";
import { OptionLoader } from "../../Utils/OptionLoader.js";
import type { RecursivePartial } from "../../Types/RecursivePartial.js";

const oklchChromaAnimationMax = 0.4,
  oklchHueAnimationMax = 360,
  oklchLightnessAnimationMax = 100;

/** Loaded animation settings for canonical OKLCH channels. */
export class OklchAnimation extends OptionLoader<IOklchAnimation> implements IOklchAnimation {
  readonly c = new ColorAnimation(0, oklchChromaAnimationMax);
  readonly h = new ColorAnimation(0, oklchHueAnimationMax);
  readonly l = new ColorAnimation(0, oklchLightnessAnimationMax);

  protected doLoad(data: RecursivePartial<IOklchAnimation>): void {
    this.h.load(data.h);
    this.c.load(data.c);
    this.l.load(data.l);
  }
}
