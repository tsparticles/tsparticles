import type { Container } from "@tsparticles/engine";

/** Particles instance wrapper */
export class ParticlesInstance {
  readonly #container: Container;

  /**
   * Creates a new ParticlesInstance
   * @param container
   */
  constructor(container: Container) {
    this.#container = container;
  }

  /** Pause the particles animation */
  pause(): void {
    this.#container.pause();
  }

  /** Resume the particles animation */
  play(): void {
    this.#container.play();
  }

  /** Stop the particles animation */
  stop(): void {
    this.#container.stop();
  }
}
