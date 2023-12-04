import type { Container, Options } from "@tsparticles/engine";
import type { IPush } from "./Options/Interfaces/IPush.js";
import type { Push } from "./Options/Classes/Push.js";

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
