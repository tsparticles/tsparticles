import type { Container, ICoordinates, RecursivePartial } from "tsparticles-engine";
import type { EmitterInstance } from "./EmitterInstance";
import type { EmitterOptions } from "./types";
import type { IEmitter } from "./Options/Interfaces/IEmitter";

export type EmitterContainer = Container & {
    actualOptions: EmitterOptions;
    addEmitter: (options: RecursivePartial<IEmitter>, position?: ICoordinates) => EmitterInstance;
    getEmitter: (idxOrName?: number | string) => EmitterInstance | undefined;
    pauseEmitter: (idxOrName?: number | string) => void;
    playEmitter: (idxOrName?: number | string) => void;
    removeEmitter: (idxOrName?: number | string) => void;
};
