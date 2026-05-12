import type { AlterType } from "../../Enums/Types/AlterType.js";

/** Particle roll animation data */
export interface IParticleRoll {
  /** Roll color alteration configuration */
  alter?: {
    type: AlterType;
    value: number;
  };
  /** Current roll angle */
  angle: number;
  /** Enables or disables the roll animation */
  enable: boolean;
  /** Enables horizontal roll */
  horizontal: boolean;
  /** Roll animation speed */
  speed: number;
  /** Enables vertical roll */
  vertical: boolean;
}
