import type { IOptionLoader } from "../IOptionLoader";
import type { IInfectionStage } from "./IInfectionStage";

export interface IInfection extends IOptionLoader<IInfection> {
    cure: boolean;
    delay: number;
    enable: boolean;
    stages: IInfectionStage[];
    infections: number;
}
