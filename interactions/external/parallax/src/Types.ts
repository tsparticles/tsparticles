import type { IParallax } from "./Options/Interfaces/IParallax.js";
import type { InteractivityContainer } from "@tsparticles/plugin-interactivity";
import type { Parallax } from "./Options/Classes/Parallax.js";
import type { ParallaxOptions } from "./Options/Classes/ParallaxOptions.js";

/** Parallax mode interface */
export interface IParallaxMode {
  parallax: IParallax;
}

/** Parallax mode options */
export interface ParallaxMode {
  parallax?: Parallax;
}

/** Parallax container interface */
export type ParallaxContainer = InteractivityContainer & {
  actualOptions: ParallaxOptions;
};
