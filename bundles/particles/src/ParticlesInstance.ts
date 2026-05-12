import type { Container } from "@tsparticles/engine";

/** Particles instance wrapper */
export class ParticlesInstance {
  private readonly _container: Container;

  /**
   * Creates a new ParticlesInstance
   * @param container
   */
  constructor(container: Container) {
    this._container = container;
  }

  /** Pause the particles animation */
  pause(): void {
    this._container.pause();
  }

  /** Resume the particles animation */
  play(): void {
    this._container.play();
  }

  /** Stop the particles animation */
  stop(): void {
    this._container.stop();
  }
}
