import type { EmitterInstance } from "./EmitterInstance";
import type { ICoordinates } from "../../Core";
import type { IEmitter } from "./Options/Interfaces/IEmitter";

export interface EmitterContainer {
    addEmitter: (options: IEmitter, position: ICoordinates) => EmitterInstance;
    getEmitter: (idxOrName?: number | string) => EmitterInstance | undefined;
    playEmitter: (idxOrName?: number | string) => void;
    pauseEmitter: (idxOrName?: number | string) => void;
}
