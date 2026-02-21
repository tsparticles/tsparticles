import { type IContainerPlugin, type IDelta, type Particle } from "@tsparticles/engine";
import type { InteractivityContainer, InteractivityEngine, InteractivityParticle } from "./types.js";
import { InteractionManager } from "./InteractionManager.js";
import { Interactivity } from "./Options/Classes/Interactivity.js";

export class InteractivityPluginInstance implements IContainerPlugin {
  readonly interactionManager: InteractionManager;

  private readonly _container;
  private readonly _engine;

  constructor(engine: InteractivityEngine, container: InteractivityContainer) {
    this._container = container;
    this._engine = engine;
    this.interactionManager = new InteractionManager(engine, container);

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

  clearClickHandlers(): void {
    this.interactionManager.clearClickHandlers();
  }

  destroy(): void {
    this.clearClickHandlers();

    this._engine.interactors?.delete(this._container);
  }

  particleCreated(particle: Particle): void {
    const interactivityParticle = particle as InteractivityParticle,
      interactivity = new Interactivity(this._engine, this._container);

    interactivity.load(this._container.actualOptions.interactivity);
    interactivity.load(interactivityParticle.options.interactivity);

    interactivityParticle.interactivity = interactivity;
  }

  particleReset(particle: Particle): void {
    this.interactionManager.reset(particle);
  }

  postParticleUpdate(particle: Particle, delta: IDelta): void {
    this.interactionManager.particlesInteract(particle, delta);
  }

  postUpdate(delta: IDelta): void {
    this.interactionManager.externalInteract(delta);
    this.interactionManager.updateMaxDistance();
  }

  async preInit(): Promise<void> {
    await this.interactionManager.initInteractors();
    this.interactionManager.init();
  }

  async redrawInit(): Promise<void> {
    await this.interactionManager.initInteractors();
    this.interactionManager.init();
  }

  start(): Promise<void> {
    this.interactionManager.addListeners();
    this.interactionManager.startObserving();

    return Promise.resolve();
  }

  stop(): void {
    this.interactionManager.removeListeners();
    this.interactionManager.stopObserving();
  }
}
