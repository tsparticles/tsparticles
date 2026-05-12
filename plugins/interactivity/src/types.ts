import type {
  Container,
  Engine,
  GenericInitializer,
  IOptions,
  IParticlesOptions,
  Options,
  Particle,
  ParticlesOptions,
  PluginManager,
  RecursivePartial,
} from "@tsparticles/engine";
import type { IInteractivity } from "./Options/Interfaces/IInteractivity.js";
import type { IInteractor } from "./Interfaces/IInteractor.js";
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

/**
 * Alias for interactivity manager initializer function
 */
export type InteractorInitializer = GenericInitializer<IInteractor>;

/** Interactivity plugin manager */
export type InteractivityPluginManager = PluginManager & {
  /** Adds an interactor by name */
  addInteractor?: (name: string, interactorInitializer: InteractorInitializer) => void;

  /** Gets all interactors for the container */
  getInteractors?: (container: Container, force?: boolean) => Promise<IInteractor[]>;

  /** The interactor initializers */
  initializers: {
    /** Map of interactor initializers */
    interactors?: Map<string, InteractorInitializer>;
  };

  /** Map of containers to their interactors */
  interactors?: Map<Container, IInteractor[]>;

  /** Sets a click handler for interactivity */
  setOnClickHandler?: (callback: (e: Event, particles?: Particle[]) => void) => void;
};

/** Engine with interactivity plugin manager */
export type InteractivityEngine = Engine & {
  /** The interactivity plugin manager */
  pluginManager: InteractivityPluginManager;
};
