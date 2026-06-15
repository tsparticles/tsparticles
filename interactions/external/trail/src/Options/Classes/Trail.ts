import {
  type IOptionLoader,
  type IParticlesOptions,
  type RecursivePartial,
  deepExtend,
  isNull,
  loadProperty,
} from "@tsparticles/engine";
import type { ITrail } from "../Interfaces/ITrail.js";
import { TrailColorCoords } from "./TrailColorCoords.js";

/** Trail mode options class */
export class Trail implements ITrail, IOptionLoader<ITrail> {
  /** Optional configuration to map mouse coordinates to particle colors */
  colorCoords?: TrailColorCoords = new TrailColorCoords();
  /** Trail emission delay in seconds */
  delay = 1;
  /** Trail particles options */
  particles?: RecursivePartial<IParticlesOptions>;
  /** Whether to pause trail when mouse stops moving */
  pauseOnStop = false;
  /** Number of particles to emit per trail step */
  quantity = 1;

  load(data?: RecursivePartial<ITrail>): void {
    if (isNull(data)) return;

    loadProperty(this, "delay", data.delay);
    loadProperty(this, "quantity", data.quantity);
    loadProperty(this, "pauseOnStop", data.pauseOnStop);

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
