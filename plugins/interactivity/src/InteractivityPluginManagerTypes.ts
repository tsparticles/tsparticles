import type { Engine, GenericInitializer, Particle, PluginManager } from "@tsparticles/engine";
import type { IInteractor } from "./Interfaces/IInteractor.js";

export type InteractorInitializer = GenericInitializer<IInteractor>;

export type InteractivityPluginManager = PluginManager & {
  addInteractor?: (name: string, interactorInitializer: InteractorInitializer) => void;
  initializers: {
    interactors?: Map<string, InteractorInitializer>;
  };
  setOnClickHandler?: (callback: (e: Event, particles?: Particle[]) => void) => void;
};

export type InteractivityEngine = Engine & {
  pluginManager: InteractivityPluginManager;
};
