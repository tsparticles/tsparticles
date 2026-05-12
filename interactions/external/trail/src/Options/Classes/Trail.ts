import {
  type IOptionLoader,
  type IParticlesOptions,
  type RecursivePartial,
  deepExtend,
  isNull,
} from "@tsparticles/engine";
import type { ITrail } from "../Interfaces/ITrail.js";
import { TrailColorCoords } from "./TrailColorCoords.js";

/** Trail mode options class */
export class Trail implements ITrail, IOptionLoader<ITrail> {
  /** Optional configuration to map mouse coordinates to particle colors */
  colorCoords?: TrailColorCoords;
  /** Trail emission delay in seconds */
  delay: number;
  /** Trail particles options */
  particles?: RecursivePartial<IParticlesOptions>;
  /** Whether to pause trail when mouse stops moving */
  pauseOnStop: boolean;
  /** Number of particles to emit per trail step */
  quantity: number;

  constructor() {
    this.delay = 1;
    this.pauseOnStop = false;
    this.quantity = 1;
    this.colorCoords = new TrailColorCoords();
  }

  /** @inheritDoc */
  load(data?: RecursivePartial<ITrail>): void {
    if (isNull(data)) return;

    if (data.delay !== undefined) {
      this.delay = data.delay;
    }

    if (data.quantity !== undefined) {
      this.quantity = data.quantity;
    }

    if (data.pauseOnStop !== undefined) {
      this.pauseOnStop = data.pauseOnStop;
    }

    if (data.particles !== undefined) {
      this.particles = deepExtend({}, data.particles) as RecursivePartial<IParticlesOptions>;
    }

    // Use the dedicated loader for color coordinates
    if (data.colorCoords) {
      this.colorCoords ??= new TrailColorCoords();

      this.colorCoords.load(data.colorCoords);
    }
  }
}
