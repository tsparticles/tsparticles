import type { IOptionLoader } from "../../../Interfaces/IOptionLoader.js";
import type { IParticlesNumber } from "../../../Interfaces/Particles/Number/IParticlesNumber.js";
import { ParticlesDensity } from "./ParticlesDensity.js";
import { ParticlesNumberLimit } from "./ParticlesNumberLimit.js";
import type { RecursivePartial } from "../../../../Types/RecursivePartial.js";
import { isNull } from "../../../../Utils/TypeUtils.js";

/**
 * [[include:Options/Particles/Number.md]]
 */
export class ParticlesNumber implements IParticlesNumber, IOptionLoader<IParticlesNumber> {
  readonly density;
  limit;
  value;

  constructor() {
    this.density = new ParticlesDensity();
    this.limit = new ParticlesNumberLimit();
    this.value = 0;
  }

  load(data?: RecursivePartial<IParticlesNumber>): void {
    if (isNull(data)) {
      return;
    }

    this.density.load(data.density);
    this.limit.load(data.limit);

    if (data.value !== undefined) {
      this.value = data.value;
    }
  }
}
