import type { IInfection } from "./IInfection";
import { IOptions } from "tsparticles";

export type IInfectionOptions = IOptions & {
    infection: IInfection;
};
