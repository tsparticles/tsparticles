import type { IInfection } from "./IInfection";
import type { IOptions } from "tsparticles";

export type IInfectionOptions = IOptions & {
    infection: IInfection;
};
