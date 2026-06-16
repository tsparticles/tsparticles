import type { Container } from "@tsparticles/engine";
import { deleteFireworksInstance } from "./utils.js";

/** Fireworks instance wrapping a tsParticles container */
export class FireworksInstance {
  readonly #container: Container;
  readonly #id: string;

  /**
   * Creates a new FireworksInstance
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

    deleteFireworksInstance(this.#id);
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
