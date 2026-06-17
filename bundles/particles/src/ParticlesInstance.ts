import type { Container } from "@tsparticles/engine";
import { deleteParticlesInstance } from "./utils.js";

/** Particles instance wrapper */
export class ParticlesInstance {
  readonly #container: Container;
  readonly #id: string;

  /**
   * Creates a new ParticlesInstance
   * @param container - The container to handle
   * @param id - The instance id used as the cache key
   */
  constructor(container: Container, id: string) {
    this.#container = container;
    this.#id = id;
  }

  /** Whether the underlying container has been destroyed */
  get destroyed(): boolean {
    return this.#container.destroyed;
  }

  /** Destroys the container and removes the instance from the internal cache */
  destroy(): void {
    this.#container.destroy();

    deleteParticlesInstance(this.#id);
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
