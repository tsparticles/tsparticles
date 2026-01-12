import type { Container, ICoordinates, RecursivePartial } from "@tsparticles/engine";
import type { AbsorberOptions } from "./types.js";
import type { AbsorberPluginInstance } from "./AbsorberPluginInstance.js";
import type { IAbsorber } from "./Options/Interfaces/IAbsorber.js";

export interface AbsorberContainer extends Container {
    actualOptions: AbsorberOptions;
    addAbsorber: (options: RecursivePartial<IAbsorber>, position?: ICoordinates) => Promise<AbsorberPluginInstance>;
    getAbsorber: (idxOrName?: number | string) => AbsorberPluginInstance | undefined;
}
