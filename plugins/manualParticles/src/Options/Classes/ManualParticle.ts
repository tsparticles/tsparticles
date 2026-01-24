import {
  type ICoordinatesWithMode,
  type IOptionLoader,
  type IParticlesOptions,
  PixelMode,
  type RecursivePartial,
  deepExtend,
  isNull,
  manualDefaultPosition,
} from "@tsparticles/engine";
import type { IManualParticle } from "../Interfaces/IManualParticle.js";

export class ManualParticle implements IManualParticle, IOptionLoader<IManualParticle> {
  options?: RecursivePartial<IParticlesOptions>;
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
