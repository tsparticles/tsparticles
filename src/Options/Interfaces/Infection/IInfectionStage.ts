import type { IOptionLoader } from "../IOptionLoader";
import { IColor } from "../../../Core/Interfaces/IColor";

export interface IInfectionStage extends IOptionLoader<IInfectionStage> {
    color: string | IColor;
    radius: number;
    rate: number;
    duration?: number;
    infectedStage?: number;
}
