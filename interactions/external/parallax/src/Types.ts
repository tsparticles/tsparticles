import type { IParallax } from "./Options/Interfaces/IParallax.js";
import type { InteractivityContainer } from "@tsparticles/plugin-interactivity";
import type { Parallax } from "./Options/Classes/Parallax.js";
import type { ParallaxOptions } from "./Options/Classes/ParallaxOptions.js";

export interface IParallaxMode {
    parallax: IParallax;
}

export interface ParallaxMode {
    parallax?: Parallax;
}

export type ParallaxContainer = InteractivityContainer & {
    actualOptions: ParallaxOptions;
};
