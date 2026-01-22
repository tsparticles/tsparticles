import type { AlterType } from "../../Enums/Types/AlterType.js";

export interface IParticleRoll {
  alter?: {
    type: AlterType;
    value: number;
  };
  angle: number;
  enable: boolean;
  horizontal: boolean;
  speed: number;
  vertical: boolean;
}
