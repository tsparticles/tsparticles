import type { InteractivityContainer, InteractivityOptions } from "@tsparticles/plugin-interactivity";
import type { IRemove } from "./Options/Interfaces/IRemove.js";
import type { Remove } from "./Options/Classes/Remove.js";

export interface IRemoveMode {
    remove: IRemove;
}

export interface RemoveMode {
    remove?: Remove;
}

export type RemoveContainer = InteractivityContainer & {
    actualOptions: RemoveOptions;
};

export type RemoveOptions = InteractivityOptions & {
    interactivity?: {
        modes: RemoveMode;
    };
};
