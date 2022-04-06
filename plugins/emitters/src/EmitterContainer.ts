import type { Container, ICoordinates, RecursivePartial } from "tsparticles-engine";
import type { EmitterInstance } from "./EmitterInstance";
import type { IEmitter } from "./Options/Interfaces/IEmitter";

export interface EmitterContainer extends Container {
    addEmitter: (options: RecursivePartial<IEmitter>, position?: ICoordinates) => EmitterInstance;
    getEmitter: (idxOrName?: number | string) => EmitterInstance | undefined;
    playEmitter: (idxOrName?: number | string) => void;
    pauseEmitter: (idxOrName?: number | string) => void;
    removeEmitter: (idxOrName?: number | string) => void;
}
