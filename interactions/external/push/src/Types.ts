import type { Container, Options } from "@tsparticles/engine";
import type { IPush } from "./Options/Interfaces/IPush";
import type { Push } from "./Options/Classes/Push";

export type IPushMode = {
    push: IPush;
};

export type PushMode = {
    push?: Push;
};

export type PushContainer = Container & {
    actualOptions: PushOptions;
};

export type PushOptions = Options & {
    interactivity: {
        modes: PushMode;
    };
};
