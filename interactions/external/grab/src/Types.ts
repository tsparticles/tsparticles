import type { IRgb, OptionsColor } from "@tsparticles/engine";
import type { InteractivityContainer, InteractivityParticle } from "@tsparticles/plugin-interactivity";
import type { Grab } from "./Options/Classes/Grab.js";
import type { GrabOptions } from "./Options/Classes/GrabOptions.js";
import type { IGrab } from "./Options/Interfaces/IGrab.js";

/** Grab mode interface */
export interface IGrabMode {
  grab: IGrab;
}

/** Grab mode options */
export interface GrabMode {
  grab?: Grab;
}

/** Grab container interface */
export type GrabContainer = InteractivityContainer & {
  actualOptions: GrabOptions;
  particles: {
    grabLineColor?: IRgb | string;
  };
  retina: {
    grabModeDistance?: number;
  };
};

/** Grab link particle */
export type LinkParticle = InteractivityParticle & {
  options: {
    links?: {
      color?: OptionsColor;
    };
  };
  retina: {
    linksWidth?: number;
  };
};
