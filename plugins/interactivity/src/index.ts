import { type Engine, type Particle, addErrorMessages, getErrorMessage } from "@tsparticles/engine";
import { type InteractivityContainer, type InteractivityEngine, type InteractorInitializer } from "./types.js";
import { ErrorCodes } from "./ErrorCodes.js";
import { ErrorMessages } from "./ErrorMessages.js";
import { InteractivityPlugin } from "./InteractivityPlugin.js";

declare const __VERSION__: string,
  process:
    | {
        env: {
          NODE_ENV?: string;
        };
      }
    | undefined;

/**
 * @param engine - The engine instance
 */
export async function loadInteractivityPlugin(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  if (typeof process !== "undefined" && process.env.NODE_ENV !== "production") {
    addErrorMessages(ErrorMessages);
  }

  await engine.pluginManager.register(e => {
    const interactivityEngine = e as InteractivityEngine,
      interactivityPluginManager = interactivityEngine.pluginManager;

    interactivityPluginManager.addPlugin(new InteractivityPlugin(interactivityPluginManager));

    interactivityPluginManager.initializers.interactors ??= new Map<string, InteractorInitializer>();

    /**
     * Adds an interaction manager to the current collection
     * @param name - the interaction manager name
     * @param interactorInitializer - the interaction manager initializer
     */
    interactivityPluginManager.addInteractor = (name: string, interactorInitializer: InteractorInitializer): void => {
      if (interactivityPluginManager.initialized) {
        return;
      }

      interactivityPluginManager.initializers.interactors ??= new Map<string, InteractorInitializer>();

      interactivityPluginManager.initializers.interactors.set(name, interactorInitializer);
    };

    /**
     * Adds another click handler to all the loaded {@link Container} objects.
     * @param callback - The function called after the click event is fired
     */
    interactivityPluginManager.setOnClickHandler = (callback: (e: Event, particles?: Particle[]) => void): void => {
      const { items } = interactivityEngine;

      if (!items.length) {
        throw new Error(getErrorMessage(ErrorCodes.interactivityClickHandlerNotSet));
      }

      items.forEach(item => {
        const interactivityContainer = item as InteractivityContainer;

        interactivityContainer.addClickHandler?.(callback);
      });
    };
  });
}

/**
 * @param e - The event object
 */
export function ensureInteractivityPluginLoaded(e: InteractivityEngine): void {
  if (!e.pluginManager.addInteractor) {
    throw new Error(getErrorMessage(ErrorCodes.interactivityPluginNotLoaded));
  }
}

export * from "./BaseClasses/ExternalInteractorBase.js";
export * from "./BaseClasses/ParticlesInteractorBase.js";
export type * from "./Interfaces/IExternalInteractor.js";
export type * from "./Interfaces/IInteractivityData.js";
export type * from "./Interfaces/IInteractor.js";
export type * from "./Interfaces/IParticleInteractorBase.js";
export type * from "./Interfaces/IParticlesInteractor.js";
export * from "./InteractivityConstants.js";
export * from "./Enums/DivType.js";
export * from "./Enums/InteractivityDetect.js";
export * from "./Enums/InteractorType.js";
export type * from "./types.js";
export * from "./utils.js";
export type * from "./Options/Interfaces/Events/IDivEvent.js";
export type * from "./Options/Interfaces/Modes/IModes.js";
export type * from "./Options/Interfaces/Modes/IModeDiv.js";
export * from "./Options/Classes/Events/DivEvent.js";
export * from "./Options/Classes/Modes/Modes.js";
