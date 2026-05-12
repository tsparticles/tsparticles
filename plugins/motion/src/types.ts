import type { Container, IOptions, Options } from "@tsparticles/engine";
import type { IMotion } from "./Options/Interfaces/IMotion.js";
import type { Motion } from "./Options/Classes/Motion.js";

/** Motion plugin options interface */
export type IMotionOptions = IOptions & {
  motion?: IMotion;
};

/** Motion plugin options class */
export type MotionOptions = Options & {
  motion?: Motion;
};

/** Container with motion capabilities */
export type MotionContainer = Container & {
  actualOptions: MotionOptions;
};
