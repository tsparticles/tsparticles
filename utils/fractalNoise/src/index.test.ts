/* eslint-disable */
import { FractalNoise } from "./index.js";
import { describe, expect, it } from "vitest";

describe("FractalNoise", () => {
  it("is deterministic and bounded for the same seed", () => {
    const a = new FractalNoise(),
      b = new FractalNoise();

    a.seed(7);
    b.seed(7);

    const va = a.noise2d(0.3, 0.7);

    expect(Number.isFinite(va)).to.be.true;
    expect(va).to.equal(b.noise2d(0.3, 0.7));
    expect(Math.abs(va)).to.be.lessThanOrEqual(1);
  });

  it("changes with the seed", () => {
    const a = new FractalNoise(),
      b = new FractalNoise();

    a.seed(1);
    b.seed(99);

    expect(a.noise2d(0.3, 0.7)).to.not.equal(b.noise2d(0.3, 0.7));
  });

  it("supports octave parameters and 3D/4D sampling", () => {
    const n = new FractalNoise();

    n.seed(5);

    const values = [n.noise2d(0.1, 0.2, 3, 0.5, 2), n.noise3d(0.1, 0.2, 0.3), n.noise4d(0.1, 0.2, 0.3, 0.4)];

    for (const value of values) {
      expect(Number.isFinite(value)).to.be.true;
      expect(Math.abs(value)).to.be.lessThanOrEqual(1);
    }
  });
});
