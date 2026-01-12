import type { Container, ICoordinates, RecursivePartial } from "@tsparticles/engine";
import type { EmittersPluginInstance } from "./EmittersPluginInstance.js";
import type { EmitterOptions } from "./types.js";
import type { IEmitter } from "./Options/Interfaces/IEmitter.js";

export type EmitterContainer = Container & {
    actualOptions: EmitterOptions;
    addEmitter: (options: RecursivePartial<IEmitter>, position?: ICoordinates) => Promise<EmittersPluginInstance>;
    getEmitter: (idxOrName?: number | string) => EmittersPluginInstance | undefined;
    pauseEmitter: (idxOrName?: number | string) => void;
    playEmitter: (idxOrName?: number | string) => void;
    removeEmitter: (idxOrName?: number | string) => void;
};
