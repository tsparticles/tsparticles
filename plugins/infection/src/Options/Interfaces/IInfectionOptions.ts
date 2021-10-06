import type { IInfection } from "./IInfection";
import { IOptions } from "tsparticles-engine";

export type IInfectionOptions = IOptions & {
    infection: IInfection;
};
