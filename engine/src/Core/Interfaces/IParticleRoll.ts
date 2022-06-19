import type { AlterType } from "../../Enums/Types/AlterType";

export interface IParticleRoll {
    enable: boolean;
    angle: number;
    horizontal: boolean;
    vertical: boolean;
    speed: number;
    alter?: {
        value: number;
        type: AlterType;
    };
}
