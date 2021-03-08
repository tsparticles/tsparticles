import type { EmitterInstance } from "./EmitterInstance";
import type { IEmitter } from "./Options/Interfaces/IEmitter";
import type { ICoordinates } from "tsparticles-core";

export interface EmitterContainer {
    addEmitter: (options: IEmitter, position: ICoordinates) => EmitterInstance;
    playEmitter: (idx: number) => void;
    pauseEmitter: (idx: number) => void;
}
