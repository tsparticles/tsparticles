import { type IContainerPlugin, type IDelta, type Particle } from "@tsparticles/engine";
import type { InteractivityContainer, InteractivityParticle, InteractivityPluginManager } from "./types.js";
import { InteractionManager } from "./InteractionManager.js";
import { Interactivity } from "./Options/Classes/Interactivity.js";

export class InteractivityPluginInstance implements IContainerPlugin {
  /** The interaction manager for this container */
  readonly interactionManager: InteractionManager;

  /** The particles container */
  private readonly _container;
  /** The plugin manager */
  private readonly _pluginManager;

  /**
   * Creates a new InteractivityPluginInstance
   * @param pluginManager - the plugin manager
   * @param container - the particles container
   */
  constructor(pluginManager: InteractivityPluginManager, container: InteractivityContainer) {
    this._container = container;
    this._pluginManager = pluginManager;
    this.interactionManager = new InteractionManager(pluginManager, container);

    this._container.addClickHandler = (callback: (evt: Event, particles?: Particle[]) => void): void => {
      this.interactionManager.addClickHandler(callback);
    };
  }

  /**
   * Adds a click handler to the container
   * @param callback - the callback to be called when the click event occurs
   */
  addClickHandler(callback: (evt: Event, particles?: Particle[]) => void): void {
    this.interactionManager.addClickHandler(callback);
  }

  /** Clears all click handlers */
  clearClickHandlers(): void {
    this.interactionManager.clearClickHandlers();
  }

  /** @inheritDoc */
  destroy(): void {
    this.clearClickHandlers();

    this._pluginManager.interactors?.delete(this._container);
  }

  /** @inheritDoc */
  particleCreated(particle: Particle): void {
    const interactivityParticle = particle as InteractivityParticle,
      interactivity = new Interactivity(this._pluginManager, this._container);

    interactivity.load(this._container.actualOptions.interactivity);
    interactivity.load(interactivityParticle.options.interactivity);

    interactivityParticle.interactivity = interactivity;
  }

  /** @inheritDoc */
  particleReset(particle: Particle): void {
    this.interactionManager.reset(particle);
  }

  /** @inheritDoc */
  postParticleUpdate(particle: Particle, delta: IDelta): void {
    this.interactionManager.particlesInteract(particle, delta);
  }

  /** @inheritDoc */
  postUpdate(delta: IDelta): void {
    this.interactionManager.externalInteract(delta);
    this.interactionManager.updateMaxDistance();
  }

  /** @inheritDoc */
  async preInit(): Promise<void> {
    await this.interactionManager.initInteractors();
    this.interactionManager.init();
  }

  /** @inheritDoc */
  async redrawInit(): Promise<void> {
    await this.interactionManager.initInteractors();
    this.interactionManager.init();
  }

  /** @inheritDoc */
  start(): Promise<void> {
    this.interactionManager.addListeners();
    this.interactionManager.startObserving();

    return Promise.resolve();
  }

  /** @inheritDoc */
  stop(): void {
    this.interactionManager.removeListeners();
    this.interactionManager.stopObserving();
  }
}
