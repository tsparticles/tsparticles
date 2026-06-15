import type {
  Container,
  IOptions,
  IParticlesOptions,
  Options,
  Particle,
  ParticlesOptions,
  RecursivePartial,
} from "@tsparticles/engine";
import type { IInteractivity } from "./Options/Interfaces/IInteractivity.js";
import type { Interactivity } from "./Options/Classes/Interactivity.js";

/** Interactivity plugin options interface */
export type IInteractivityOptions = IOptions & {
  /** The interactivity options */
  interactivity?: IInteractivity;
};

/** Interactivity plugin options class */
export type InteractivityOptions = Options & {
  interactivity?: Interactivity;
};

/** Container with interactivity capabilities */
export type InteractivityContainer = Container & {
  /** The actual interactivity options */
  actualOptions: InteractivityOptions;

  /** Adds a click handler for interactivity */
  addClickHandler?: (callback: (evt: Event, particles?: Particle[]) => void) => void;
};

/** Particle with interactivity data */
export type InteractivityParticle = Particle & {
  /** The interactivity options for this particle */
  interactivity?: Interactivity;
  /** The particle options including interactivity */
  options: InteractivityParticlesOptions;
};

/** Interactivity particles options interface */
export type IInteractivityParticlesOptions = IParticlesOptions & {
  /** The interactivity options for particles */
  interactivity?: RecursivePartial<IInteractivity>;
};

/** Interactivity particles options class */
export type InteractivityParticlesOptions = RecursivePartial<ParticlesOptions> & {
  /** The interactivity options for particles */
  interactivity?: RecursivePartial<IInteractivity>;
};

export type {
  InteractorInitializer,
  InteractivityEngine,
  InteractivityPluginManager,
} from "./InteractivityPluginManagerTypes.js";
