import type { Container } from "@tsparticles/engine";

/** Fireworks instance wrapping a tsParticles container */
export class FireworksInstance {
  readonly #container: Container;

  /**
   * Creates a new FireworksInstance
   * @param container
   */
  constructor(container: Container) {
    this.#container = container;
  }

  /** Pauses the fireworks animation */
  pause(): void {
    this.#container.pause();
  }

  /** Resumes the fireworks animation */
  play(): void {
    this.#container.play();
  }

  /** Stops the fireworks animation */
  stop(): void {
    this.#container.stop();
  }
}
