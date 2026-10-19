/* eslint-disable */
import { PerlinNoise } from "./index.js";
import { describe, expect, it } from "vitest";

describe("PerlinNoise", () => {
  it("is deterministic for the same seed", () => {
    const a = new PerlinNoise(),
      b = new PerlinNoise();

    a.seed(123);
    b.seed(123);

    const va = a.noise2d(0.3, 0.7);

    expect(Number.isFinite(va)).to.be.true;
    expect(va).to.equal(b.noise2d(0.3, 0.7));
  });

  it("changes with the seed", () => {
    const a = new PerlinNoise(),
      b = new PerlinNoise();

    a.seed(1);
    b.seed(2);

    expect(a.noise2d(0.3, 0.7)).to.not.equal(b.noise2d(0.3, 0.7));
  });

  it("supports 3D and 4D sampling", () => {
    const n = new PerlinNoise();

    n.seed(9);

    for (const value of [n.noise3d(0.1, 0.2, 0.3), n.noise4d(0.1, 0.2, 0.3, 0.4)]) {
      expect(Number.isFinite(value)).to.be.true;
    }
  });
});
