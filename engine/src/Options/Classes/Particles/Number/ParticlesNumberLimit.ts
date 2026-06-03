import type { IParticlesNumberLimit } from "../../../Interfaces/Particles/Number/IParticlesNumberLimit.js";
import { LimitMode } from "../../../../Enums/Modes/LimitMode.js";
import { OptionLoader } from "../../../../Utils/OptionsUtils.js";
import type { RecursivePartial } from "../../../../Types/RecursivePartial.js";

export class ParticlesNumberLimit extends OptionLoader<IParticlesNumberLimit> implements IParticlesNumberLimit {
  mode: LimitMode | keyof typeof LimitMode;
  value: number;

  constructor() {
    super();
    this.mode = LimitMode.delete;
    this.value = 0;
  }

  doLoad(data: RecursivePartial<IParticlesNumberLimit>): void {
    if (data.mode !== undefined) {
      this.mode = data.mode;
    }

    if (data.value !== undefined) {
      this.value = data.value;
    }
  }
}
