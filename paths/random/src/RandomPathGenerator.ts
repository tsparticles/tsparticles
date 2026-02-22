import { type IMovePathGenerator, Vector, getRandomInRange } from "@tsparticles/engine";

const minRandom = -1,
  maxRandom = 1;

export class RandomPathGenerator implements IMovePathGenerator {
  private readonly _res: Vector;

  constructor() {
    this._res = Vector.origin;
  }

  generate(): Vector {
    this._res.x = getRandomInRange(minRandom, maxRandom);
    this._res.y = getRandomInRange(minRandom, maxRandom);

    return this._res;
  }

  init(): void {
    // do nothing
  }

  reset(): void {
    // do nothing
  }

  update(): void {
    // do nothing
  }
}
