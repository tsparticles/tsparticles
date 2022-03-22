import type { AlterType } from "../../Enums";

export interface IParticleRoll {
    angle: number;
    speed: number;
    alter?: {
        value: number;
        type: AlterType;
    };
}
