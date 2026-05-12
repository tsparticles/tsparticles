import type { Container, IOptions, Options } from "@tsparticles/engine";
import type { CanvasMask } from "./Options/Classes/CanvasMask.js";
import type { ICanvasMask } from "./Options/Interfaces/ICanvasMask.js";

/** Canvas mask options interface */
export type ICanvasMaskOptions = IOptions & {
  /** The canvas mask options */
  canvasMask?: ICanvasMask;
};

/** Canvas mask options */
export type CanvasMaskOptions = Options & {
  /** The canvas mask options */
  canvasMask?: CanvasMask;
};

/** Canvas mask container type */
export type CanvasMaskContainer = Container & {
  /** The canvas mask options */
  actualOptions: CanvasMaskOptions;
};
