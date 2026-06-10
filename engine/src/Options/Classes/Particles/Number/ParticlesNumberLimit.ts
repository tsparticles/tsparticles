import { OptionLoader, loadProperty } from "../../../../Utils/OptionsUtils.js";
import type { IParticlesNumberLimit } from "../../../Interfaces/Particles/Number/IParticlesNumberLimit.js";
import { LimitMode } from "../../../../Enums/Modes/LimitMode.js";
import type { RecursivePartial } from "../../../../Types/RecursivePartial.js";

export class ParticlesNumberLimit extends OptionLoader<IParticlesNumberLimit> implements IParticlesNumberLimit {
  mode: LimitMode | keyof typeof LimitMode = LimitMode.delete;
  value = 0;

  protected doLoad(data: RecursivePartial<IParticlesNumberLimit>): void {
    loadProperty(this, "mode", data.mode);
    loadProperty(this, "value", data.value);
  }
}
