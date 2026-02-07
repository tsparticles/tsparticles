import { type Container, type Engine, type Particle, getItemsFromInitializer } from "@tsparticles/engine";
import { type InteractivityContainer, type InteractivityEngine, type InteractorInitializer } from "./types.js";
import { type IInteractor } from "./Interfaces/IInteractor.js";

declare const __VERSION__: string;

/**
 * @param engine - The engine instance
 */
export async function loadInteractivityPlugin(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(async e => {
    const interactivityEngine = e as InteractivityEngine,
      { InteractivityPlugin } = await import("./InteractivityPlugin.js");

    interactivityEngine.addPlugin(new InteractivityPlugin(interactivityEngine));

    interactivityEngine.initializers.interactors ??= new Map<string, InteractorInitializer>();
    interactivityEngine.interactors ??= new Map<Container, IInteractor[]>();

    /**
     * Adds an interaction manager to the current collection
     * @param name - the interaction manager name
     * @param interactorInitializer - the interaction manager initializer
     */
    interactivityEngine.addInteractor = (name: string, interactorInitializer: InteractorInitializer): void => {
      interactivityEngine.initializers.interactors ??= new Map<string, InteractorInitializer>();

      interactivityEngine.initializers.interactors.set(name, interactorInitializer);
    };

    /**
     * Returns all the container interaction managers
     * @param container - the container used to check which interaction managers are compatible
     * @param force - if true reloads the interaction managers collection for the given container
     * @returns the array of interaction managers for the given container
     */
    interactivityEngine.getInteractors = async (container: Container, force = false): Promise<IInteractor[]> => {
      interactivityEngine.interactors ??= new Map<Container, IInteractor[]>();
      interactivityEngine.initializers.interactors ??= new Map<string, InteractorInitializer>();

      return getItemsFromInitializer(
        container,
        interactivityEngine.interactors,
        interactivityEngine.initializers.interactors,
        force,
      );
    };

    /**
     * Adds another click handler to all the loaded {@link Container} objects.
     * @param callback - The function called after the click event is fired
     */
    interactivityEngine.setOnClickHandler = (callback: (e: Event, particles?: Particle[]) => void): void => {
      const { items } = interactivityEngine;

      if (!items.length) {
        throw new Error("Click handlers can only be set after calling tsParticles.load()");
      }

      items.forEach(item => {
        const interactivityContainer = item as InteractivityContainer;

        interactivityContainer.addClickHandler?.(callback);
      });
    };
  });
}

/**
 * @param e -
 */
export function ensureInteractivityPluginLoaded(e: InteractivityEngine): void {
  if (!e.addInteractor) {
    throw new Error("tsParticles Interactivity Plugin is not loaded");
  }
}

export * from "./BaseClasses/ExternalInteractorBase.js";
export * from "./BaseClasses/GlobalInteractorBase.js";
export * from "./BaseClasses/ParticlesInteractorBase.js";
export type * from "./Interfaces/IExternalInteractor.js";
export type * from "./Interfaces/IGlobalInteractor.js";
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
