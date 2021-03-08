import type { AbsorberInstance } from "./AbsorberInstance";
import type { IAbsorber } from "./Options/Interfaces/IAbsorber";
import type { ICoordinates } from "tsparticles-core";

export interface AbsorberContainer {
    addAbsorber: (options: IAbsorber, position: ICoordinates) => AbsorberInstance;
}
