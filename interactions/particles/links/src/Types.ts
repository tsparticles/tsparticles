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

export type LinkContainer = InteractivityContainer & {
  particles: {
    linksColor?: IRgb | string;
    linksColors: Map<string, IRgb | string | undefined>;
  };
};

export type LinkParticle = InteractivityParticle & {
  links?: ILink[];
  options: ParticlesLinkOptions;
  retina: {
    linksDistance?: number;
    linksWidth?: number;
  };
};

export interface LinkBatch {
  colorStyle: string;
  coords: number[];
  opacity: number;
  width: number;
}

export interface TriangleBatch {
  colorStyle: string;
  coords: number[];
  opacity: number;
}

export type IParticlesLinkOptions = IInteractivityParticlesOptions & {
  links?: ILinks;
};

export type ParticlesLinkOptions = InteractivityParticlesOptions & {
  links?: Links;
};
