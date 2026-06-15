import {
  type IOptionLoader,
  type IParticlesOptions,
  type RecursivePartial,
  deepExtend,
  isNull,
  loadProperty,
} from "@tsparticles/engine";
import type { IInteractivityParticleOptions } from "../Interfaces/IInteractivityParticleOptions.js";

/** Interactivity particle options class */
export class InteractivityParticleOptions
  implements IInteractivityParticleOptions, IOptionLoader<IInteractivityParticleOptions>
{
  /** The particle options applied to the interactivity particle */
  options?: RecursivePartial<IParticlesOptions>;

  /** Whether to pause the particle when the mouse stops moving */
  pauseOnStop = false;
  /** Whether to replace the cursor with a custom one */
  replaceCursor = false;
  /** The delay in milliseconds before stopping the particle */
  stopDelay = 0;

  load(data?: RecursivePartial<IInteractivityParticleOptions>): void {
    if (isNull(data)) {
      return;
    }

    if (data.options !== undefined) {
      this.options = deepExtend({}, data.options) as RecursivePartial<IParticlesOptions>;
    }

    loadProperty(this, "replaceCursor", data.replaceCursor);
    loadProperty(this, "pauseOnStop", data.pauseOnStop);
    loadProperty(this, "stopDelay", data.stopDelay);
  }
}
