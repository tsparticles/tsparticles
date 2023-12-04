import type { Container, IOptions, Options } from "@tsparticles/engine";
import type { CanvasMask } from "./Options/Classes/CanvasMask.js";
import type { ICanvasMask } from "./Options/Interfaces/ICanvasMask.js";

export type ICanvasMaskOptions = IOptions & {
    canvasMask?: ICanvasMask;
};

export type CanvasMaskOptions = Options & {
    canvasMask?: CanvasMask;
};

export type CanvasMaskContainer = Container & {
    actualOptions: CanvasMaskOptions;
};
