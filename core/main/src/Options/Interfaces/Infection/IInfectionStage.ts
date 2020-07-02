import type { IColor } from "../../../Core/Interfaces/IColor";

export interface IInfectionStage {
    color: string | IColor;
    radius: number;
    rate: number;
    duration?: number;
    infectedStage?: number;
}
