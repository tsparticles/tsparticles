import type {
  Container,
  ContainerScopedMap,
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

export type IInteractivityOptions = IOptions & {
  interactivity?: IInteractivity;
};

export type InteractivityOptions = Options & {
  interactivity?: Interactivity;
};

export type InteractivityContainer = Container & {
  actualOptions: InteractivityOptions;

  addClickHandler?: (callback: (evt: Event, particles?: Particle[]) => void) => void;
};

export type InteractivityParticle = Particle & {
  interactivity?: Interactivity;
  options: InteractivityParticlesOptions;
};

export type IInteractivityParticlesOptions = IParticlesOptions & {
  interactivity?: RecursivePartial<IInteractivity>;
};

export type InteractivityParticlesOptions = RecursivePartial<ParticlesOptions> & {
  interactivity?: RecursivePartial<IInteractivity>;
};

/**
 * Alias for interactivity manager initializer function
 */
export type InteractorInitializer = GenericInitializer<IInteractor>;

export type InteractivityPluginManager = PluginManager & {
  addInteractor?: (name: string, interactorInitializer: InteractorInitializer) => void;

  getInteractors?: (container: Container, force?: boolean) => Promise<IInteractor[]>;

  initializers: {
    interactors?: Map<string, InteractorInitializer>;
  };

  interactors?: ContainerScopedMap<IInteractor[]>;

  setOnClickHandler?: (callback: (e: Event, particles?: Particle[]) => void) => void;
};

export type InteractivityEngine = Engine & {
  pluginManager: InteractivityPluginManager;
};
