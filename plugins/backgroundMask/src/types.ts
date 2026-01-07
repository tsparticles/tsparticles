import type { Container, IOptions, Options } from "@tsparticles/engine";
import type { BackgroundMask } from "./Options/Classes/BackgroundMask.js";
import type { IBackgroundMask } from "./Options/Interfaces/IBackgroundMask.js";

export type IBackgroundMaskOptions = IOptions & {
    backgroundMask?: IBackgroundMask;
};

export type BackgroundMaskOptions = Options & {
    backgroundMask?: BackgroundMask;
};

export type BackgroundMaskContainer = Container & {
    actualOptions: BackgroundMaskOptions;
};
