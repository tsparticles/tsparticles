import { OptionLoader, loadProperty } from "../../../../Utils/OptionsUtils.js";
import type { IParticlesNumber } from "../../../Interfaces/Particles/Number/IParticlesNumber.js";
import { ParticlesDensity } from "./ParticlesDensity.js";
import { ParticlesNumberLimit } from "./ParticlesNumberLimit.js";
import type { RecursivePartial } from "../../../../Types/RecursivePartial.js";

/**
 * [[include:Options/Particles/Number.md]]
 */
export class ParticlesNumber extends OptionLoader<IParticlesNumber> implements IParticlesNumber {
  readonly density = new ParticlesDensity();
  readonly limit = new ParticlesNumberLimit();
  value = 0;

  protected doLoad(data: RecursivePartial<IParticlesNumber>): void {
    this.density.load(data.density);
    this.limit.load(data.limit);
    loadProperty(this, "value", data.value);
  }
}
