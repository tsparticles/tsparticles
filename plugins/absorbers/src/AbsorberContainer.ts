import type { Container, ICoordinates, RecursivePartial } from "@tsparticles/engine";
import type { AbsorberInstance } from "./AbsorberInstance.js";
import type { AbsorberOptions } from "./types.js";
import type { IAbsorber } from "./Options/Interfaces/IAbsorber.js";

export interface AbsorberContainer extends Container {
    actualOptions: AbsorberOptions;
    addAbsorber: (options: RecursivePartial<IAbsorber>, position?: ICoordinates) => Promise<AbsorberInstance>;
    getAbsorber: (idxOrName?: number | string) => AbsorberInstance | undefined;
}
