import type { Container, ICoordinates, RecursivePartial } from "tsparticles-engine";
import type { AbsorberInstance } from "./AbsorberInstance";
import type { IAbsorber } from "./Options/Interfaces/IAbsorber";

export interface AbsorberContainer extends Container {
    addAbsorber: (options: RecursivePartial<IAbsorber>, position?: ICoordinates) => AbsorberInstance;
    getAbsorber: (idxOrName?: number | string) => AbsorberInstance | undefined;
}
