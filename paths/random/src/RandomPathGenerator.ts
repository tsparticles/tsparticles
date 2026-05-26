import { Vector, getRandomInRange } from "@tsparticles/engine";
import { type IMovePathGenerator } from "@tsparticles/plugin-move";

const minRandom = -1,
  maxRandom = 1;

/** Random path generator plugin */
export class RandomPathGenerator implements IMovePathGenerator {
  /** The result vector */
  readonly #res: Vector;

  /** RandomPathGenerator constructor */
  constructor() {
    this.#res = Vector.origin;
  }

  /** Generates a random movement vector */
  generate(): Vector {
    this.#res.x = getRandomInRange(minRandom, maxRandom);
    this.#res.y = getRandomInRange(minRandom, maxRandom);

    return this.#res;
  }

  /** Initializes the path generator (no-op) */
  init(): void {
    // do nothing
  }

  /** Resets the path generator (no-op) */
  reset(): void {
    // do nothing
  }

  /** Updates the path generator (no-op) */
  update(): void {
    // do nothing
  }
}
