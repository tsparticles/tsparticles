import { type IMovePathGenerator, Vector, getRandomInRange } from "@tsparticles/engine";

const minRandom = -1,
  maxRandom = 1;

export class RandomPathGenerator implements IMovePathGenerator {
  generate(): Vector {
    return Vector.create(getRandomInRange(minRandom, maxRandom), getRandomInRange(minRandom, maxRandom));
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
