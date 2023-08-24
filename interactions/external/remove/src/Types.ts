import type { Container, Options } from "@tsparticles/engine";
import type { IRemove } from "./Options/Interfaces/IRemove";
import type { Remove } from "./Options/Classes/Remove";

export type IRemoveMode = {
    remove: IRemove;
};

export type RemoveMode = {
    remove?: Remove;
};

export type RemoveContainer = Container & {
    actualOptions: RemoveOptions;
};

export type RemoveOptions = Options & {
    interactivity: {
        modes: RemoveMode;
    };
};
