import type { IParticlesNumber } from "../../../Interfaces/Particles/Number/IParticlesNumber.js";
import { OptionLoader } from "../../../../Utils/OptionsUtils.js";
import { ParticlesDensity } from "./ParticlesDensity.js";
import { ParticlesNumberLimit } from "./ParticlesNumberLimit.js";
import type { RecursivePartial } from "../../../../Types/RecursivePartial.js";

/**
 * [[include:Options/Particles/Number.md]]
 */
export class ParticlesNumber extends OptionLoader<IParticlesNumber> implements IParticlesNumber {
  readonly density;
  limit;
  value;

  constructor() {
    super();
    this.density = new ParticlesDensity();
    this.limit = new ParticlesNumberLimit();
    this.value = 0;
  }

  doLoad(data: RecursivePartial<IParticlesNumber>): void {
    this.density.load(data.density);
    this.limit.load(data.limit);

    if (data.value !== undefined) {
      this.value = data.value;
    }
  }
}
