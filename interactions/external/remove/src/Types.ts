import type { Container } from "tsparticles-engine";
import type { IRemove } from "./Options/Interfaces/IRemove";
import type { Remove } from "./Options/Classes/Remove";
import type { RemoveOptions } from "./Options/Classes/RemoveOptions";

export type IRemoveMode = {
    remove: IRemove;
};

export type RemoveMode = {
    remove?: Remove;
};

export type RemoveContainer = Container & {
    actualOptions: RemoveOptions;
};
