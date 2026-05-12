import {
  type IOptionLoader,
  type IParticlesOptions,
  type RecursivePartial,
  deepExtend,
  isNull,
} from "@tsparticles/engine";
import type { IInteractivityParticleOptions } from "../Interfaces/IInteractivityParticleOptions.js";

/** Interactivity particle options class */
export class InteractivityParticleOptions
  implements IInteractivityParticleOptions, IOptionLoader<IInteractivityParticleOptions>
{
  /** The particle options applied to the interactivity particle */
  options?: RecursivePartial<IParticlesOptions>;

  /** Whether to pause the particle when the mouse stops moving */
  pauseOnStop: boolean;

  /** Whether to replace the cursor with a custom one */
  replaceCursor: boolean;

  /** The delay in milliseconds before stopping the particle */
  stopDelay: number;

  constructor() {
    this.replaceCursor = false;
    this.pauseOnStop = false;
    this.stopDelay = 0;
  }

  /** @inheritDoc */
  load(data?: RecursivePartial<IInteractivityParticleOptions>): void {
    if (isNull(data)) {
      return;
    }

    if (data.options !== undefined) {
      this.options = deepExtend({}, data.options) as RecursivePartial<IParticlesOptions>;
    }

    if (data.replaceCursor !== undefined) {
      this.replaceCursor = data.replaceCursor;
    }

    if (data.pauseOnStop !== undefined) {
      this.pauseOnStop = data.pauseOnStop;
    }

    if (data.stopDelay !== undefined) {
      this.stopDelay = data.stopDelay;
    }
  }
}
