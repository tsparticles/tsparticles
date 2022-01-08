import type { AbsorberInstance } from "./AbsorberInstance";
import type { IAbsorber } from "./Options/Interfaces/IAbsorber";
import type { ICoordinates } from "../../Core";

export interface AbsorberContainer {
    addAbsorber: (options: IAbsorber, position: ICoordinates) => AbsorberInstance;
    getAbsorber: (idxOrName?: number | string) => AbsorberInstance | undefined;
}
