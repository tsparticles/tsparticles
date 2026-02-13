import type { IParticlesOptions, RecursivePartial } from "@tsparticles/engine";
import type { ITrailColorCoords } from "./ITrailColorCoords.js";

export interface ITrail {
  /**
   * Optional configuration to map mouse coordinates to particle colors
   */
  colorCoords?: ITrailColorCoords;

  delay: number;
  particles?: RecursivePartial<IParticlesOptions>;
  pauseOnStop: boolean;
  quantity: number;
}
