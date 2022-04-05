import type { AlterType } from "../../Enums/Types/AlterType";

export interface IParticleRoll {
    angle: number;
    speed: number;
    alter?: {
        value: number;
        type: AlterType;
    };
}
