import type { IInfection } from "./IInfection";
import type { IOptions } from "../../../../Options/Interfaces/IOptions";

export type IInfectionOptions = IOptions & {
    infection: IInfection;
};
