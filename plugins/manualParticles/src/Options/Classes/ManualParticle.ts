import {
  type ICoordinatesWithMode,
  type IOptionLoader,
  type IParticlesOptions,
  PixelMode,
  type RecursivePartial,
  deepExtend,
  isNull,
} from "@tsparticles/engine";
import type { IManualParticle } from "../Interfaces/IManualParticle.js";

const manualDefaultPosition = 50;

export class ManualParticle implements IManualParticle, IOptionLoader<IManualParticle> {
  /** Particle options, these properties will override the general particles configuration */
  options?: RecursivePartial<IParticlesOptions>;
  /** Particle position in canvas size percent, if undefined a random position will be used */
  position?: ICoordinatesWithMode;

  load(data?: RecursivePartial<IManualParticle>): void {
    if (isNull(data)) {
      return;
    }

    if (data.position) {
      this.position = {
        x: data.position.x ?? manualDefaultPosition,
        y: data.position.y ?? manualDefaultPosition,
        mode: data.position.mode ?? PixelMode.percent,
      };
    }

    if (data.options) {
      this.options = deepExtend({}, data.options) as RecursivePartial<IParticlesOptions>;
    }
  }
}
