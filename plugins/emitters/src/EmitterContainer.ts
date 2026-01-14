import type { Container, ICoordinates, RecursivePartial } from "@tsparticles/engine";
import type { EmitterOptions } from "./types.js";
import type { EmittersInstance } from "./EmittersInstance.js";
import type { IEmitter } from "./Options/Interfaces/IEmitter.js";

export type EmitterContainer = Container & {
    actualOptions: EmitterOptions;
    addEmitter: (options: RecursivePartial<IEmitter>, position?: ICoordinates) => Promise<EmittersInstance>;
    getEmitter: (idxOrName?: number | string) => EmittersInstance | undefined;
    pauseEmitter: (idxOrName?: number | string) => void;
    playEmitter: (idxOrName?: number | string) => void;
    removeEmitter: (idxOrName?: number | string) => void;
};
