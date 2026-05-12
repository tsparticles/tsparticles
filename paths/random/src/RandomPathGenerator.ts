import { Vector, getRandomInRange } from "@tsparticles/engine";
import { type IMovePathGenerator } from "@tsparticles/plugin-move";

const minRandom = -1,
  maxRandom = 1;

/** Random path generator plugin */
export class RandomPathGenerator implements IMovePathGenerator {
  /** The result vector */
  private readonly _res: Vector;

  /** RandomPathGenerator constructor */
  constructor() {
    this._res = Vector.origin;
  }

  /** Generates a random movement vector */
  generate(): Vector {
    this._res.x = getRandomInRange(minRandom, maxRandom);
    this._res.y = getRandomInRange(minRandom, maxRandom);

    return this._res;
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
