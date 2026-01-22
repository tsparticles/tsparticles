import type { Container, IOptions, Options } from "@tsparticles/engine";
import type { IMotion } from "./Options/Interfaces/IMotion.js";
import type { Motion } from "./Options/Classes/Motion.js";

export type IMotionOptions = IOptions & {
  motion?: IMotion;
};

export type MotionOptions = Options & {
  motion?: Motion;
};

export type MotionContainer = Container & {
  actualOptions: MotionOptions;
};
