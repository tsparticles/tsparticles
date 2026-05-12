import type {
  IInteractivityParticlesOptions,
  InteractivityContainer,
  InteractivityParticle,
  InteractivityParticlesOptions,
} from "@tsparticles/plugin-interactivity";
import type { ILink } from "./Interfaces.js";
import type { ILinks } from "./Options/Interfaces/ILinks.js";
import type { IRgb } from "@tsparticles/engine";
import type { Links } from "./Options/Classes/Links.js";

/** Link container type */
export type LinkContainer = InteractivityContainer & {
  particles: {
    linksColor?: IRgb | string;
    linksColors: Map<string, IRgb | string | undefined>;
  };
};

/** Link particle type */
export type LinkParticle = InteractivityParticle & {
  links?: ILink[];
  linksDistance?: number;
  linksWidth?: number;
  options: ParticlesLinkOptions;
  retina: {
    linksDistance?: number;
    linksWidth?: number;
  };
};

/** Link batch data for rendering */
export interface LinkBatch {
  /** CSS color string */
  colorStyle: string;
  /** Quad vertex coordinates [x1,y1, x2,y2, x3,y3, x4,y4] */
  coords: number[];
  /** Line opacity */
  opacity: number;
  /** Line width */
  width: number;
}

/** Triangle batch data for rendering */
export interface TriangleBatch {
  /** CSS color string */
  colorStyle: string;
  /** Triangle vertex coordinates [x1,y1, x2,y2, x3,y3] */
  coords: number[];
  /** Triangle fill opacity */
  opacity: number;
}

/** Particles link options interface */
export type IParticlesLinkOptions = IInteractivityParticlesOptions & {
  links?: ILinks;
};

/** Particles link options class */
export type ParticlesLinkOptions = InteractivityParticlesOptions & {
  links?: Links;
};
