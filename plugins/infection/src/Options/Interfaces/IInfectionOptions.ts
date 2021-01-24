import type { IInfection } from "./IInfection";
import { IOptions } from "tsparticles-core";

export type IInfectionOptions = IOptions & {
    infection: IInfection;
};
