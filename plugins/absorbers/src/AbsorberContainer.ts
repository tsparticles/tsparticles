import type { Container, ICoordinates, RecursivePartial } from "tsparticles-engine";
import type { AbsorberInstance } from "./AbsorberInstance";
import type { AbsorberOptions } from "./types";
import type { IAbsorber } from "./Options/Interfaces/IAbsorber";

export interface AbsorberContainer extends Container {
    actualOptions: AbsorberOptions;
    addAbsorber: (options: RecursivePartial<IAbsorber>, position?: ICoordinates) => AbsorberInstance;
    getAbsorber: (idxOrName?: number | string) => AbsorberInstance | undefined;
}
