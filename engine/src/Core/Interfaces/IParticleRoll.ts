import type { AlterType } from "../../Enums/Types/AlterType";
import { RollMode } from "../../Enums/Modes/RollMode";

export interface IParticleRoll {
    enable: boolean;
    angle: number;
    mode: RollMode | keyof typeof RollMode;
    speed: number;
    alter?: {
        value: number;
        type: AlterType;
    };
}
