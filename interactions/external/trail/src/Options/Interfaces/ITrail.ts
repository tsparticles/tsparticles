import type { IParticlesOptions, RecursivePartial } from "@tsparticles/engine";
import type { ITrailColorCoords } from "./ITrailColorCoords.js";

/** Trail mode options */
export interface ITrail {
  /** Optional configuration to map mouse coordinates to particle colors */
  colorCoords?: ITrailColorCoords;
  /** Trail emission delay in seconds */
  delay: number;
  /** Trail particles options */
  particles?: RecursivePartial<IParticlesOptions>;
  /** Whether to pause trail when mouse stops moving */
  pauseOnStop: boolean;
  /** Number of particles to emit per trail step */
  quantity: number;
}
