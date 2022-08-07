import type { Container } from "tsparticles-engine";
import type { IPush } from "./Options/Interfaces/IPush";
import type { Push } from "./Options/Classes/Push";
import type { PushOptions } from "./Options/Classes/PushOptions";

export type IPushMode = {
    push: IPush;
};

export type PushMode = {
    push?: Push;
};

export type PushContainer = Container & {
    actualOptions: PushOptions;
};
