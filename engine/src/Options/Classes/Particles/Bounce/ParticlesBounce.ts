import type { IParticlesBounce } from "../../../Interfaces/Particles/Bounce/IParticlesBounce.js";
import { OptionLoader } from "../../../../Utils/OptionsUtils.js";
import { ParticlesBounceFactor } from "./ParticlesBounceFactor.js";
import type { RecursivePartial } from "../../../../Types/RecursivePartial.js";

export class ParticlesBounce extends OptionLoader<IParticlesBounce> implements IParticlesBounce {
  readonly horizontal;
  readonly vertical;

  constructor() {
    super();
    this.horizontal = new ParticlesBounceFactor();
    this.vertical = new ParticlesBounceFactor();
  }

  doLoad(data: RecursivePartial<IParticlesBounce>): void {
    this.horizontal.load(data.horizontal);
    this.vertical.load(data.vertical);
  }
}
