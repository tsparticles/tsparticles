import type { IInfectionStage } from "./IInfectionStage";

export interface IInfection {
    cure: boolean;
    delay: number;
    enable: boolean;
    stages: IInfectionStage[];
    infections: number;
}
