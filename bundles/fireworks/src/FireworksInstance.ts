import type { Container } from "@tsparticles/engine";

/** Fireworks instance wrapping a tsParticles container */
export class FireworksInstance {
  private readonly _container: Container;

  /**
   * Creates a new FireworksInstance
   * @param container
   */
  constructor(container: Container) {
    this._container = container;
  }

  /** Pauses the fireworks animation */
  pause(): void {
    this._container.pause();
  }

  /** Resumes the fireworks animation */
  play(): void {
    this._container.play();
  }

  /** Stops the fireworks animation */
  stop(): void {
    this._container.stop();
  }
}
