import type { Container, IOptions, Options } from "tsparticles-engine";
import type { CanvasMask } from "./Options/Classes/CanvasMask";
import type { ICanvasMask } from "./Options/Interfaces/ICanvasMask";

export type ICanvasMaskOptions = IOptions & {
    canvasMask?: ICanvasMask;
};

export type CanvasMaskOptions = Options & {
    canvasMask?: CanvasMask;
};

export type CanvasMaskContainer = Container & {
    actualOptions: CanvasMaskOptions;
};
