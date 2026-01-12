import type { Container } from "@tsparticles/engine";
import type { IParallax } from "./Options/Interfaces/IParallax.js";
import type { Parallax } from "./Options/Classes/Parallax.js";
import type { ParallaxOptions } from "./Options/Classes/ParallaxOptions.js";

export interface IParallaxMode {
    parallax: IParallax;
}

export interface ParallaxMode {
    parallax?: Parallax;
}

export type ParallaxContainer = Container & {
    actualOptions: ParallaxOptions;
};
