import { type IContainerPlugin, type IDelta, type Particle } from "@tsparticles/engine";
import type { InteractivityContainer, InteractivityParticle, InteractivityPluginManager } from "./types.js";
import { InteractionManager } from "./InteractionManager.js";
import { Interactivity } from "./Options/Classes/Interactivity.js";

export class InteractivityPluginInstance implements IContainerPlugin {
  /** The particles container */
  readonly #container;

  /**
   * Creates a new InteractivityPluginInstance
   * @param pluginManager - the plugin manager
   * @param container - the particles container
   */
  constructor(pluginManager: InteractivityPluginManager, container: InteractivityContainer) {
    container.addClickHandler = (callback: (evt: Event, particles?: Particle[]) => void): void => {
      container.interactionManager?.addClickHandler(callback);
    };

    container.interactionManager = new InteractionManager(pluginManager, container);

    this.#container = container;
  }

  /**
   * Adds a click handler to the container
   * @param callback - the callback to be called when the click event occurs
   */
  addClickHandler(callback: (evt: Event, particles?: Particle[]) => void): void {
    this.#container.interactionManager?.addClickHandler(callback);
  }

  /** Clears all click handlers */
  clearClickHandlers(): void {
    this.#container.interactionManager?.clearClickHandlers();
  }

  destroy(): void {
    this.clearClickHandlers();
  }

  particleCreated(particle: Particle): void {
    const interactivityParticle = particle as InteractivityParticle,
      container = this.#container,
      interactivity = new Interactivity(container);

    interactivity.load(container.actualOptions.interactivity);
    interactivity.load(interactivityParticle.options.interactivity);

    interactivityParticle.interactivity = interactivity;
  }

  particleReset(particle: Particle): void {
    this.#container.interactionManager?.reset(particle);
  }

  postParticleUpdate(particle: Particle, delta: IDelta): void {
    this.#container.interactionManager?.particlesInteract(particle, delta);
  }

  postUpdate(delta: IDelta): void {
    const container = this.#container;

    container.interactionManager?.externalInteract(delta);
    container.interactionManager?.updateMaxDistance();
  }

  async preInit(): Promise<void> {
    const container = this.#container;

    await container.interactionManager?.initInteractors();
    container.interactionManager?.init();
  }

  async redrawInit(): Promise<void> {
    const container = this.#container;

    await container.interactionManager?.initInteractors();
    container.interactionManager?.init();
  }

  start(): Promise<void> {
    const container = this.#container;

    container.interactionManager?.addListeners();
    container.interactionManager?.startObserving();

    return Promise.resolve();
  }

  stop(): void {
    this.#container.interactionManager?.removeListeners();
    this.#container.interactionManager?.stopObserving();
  }
}
