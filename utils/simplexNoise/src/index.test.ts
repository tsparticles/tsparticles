/* eslint-disable */
import { SimplexNoise } from "./index.js";
import { describe, expect, it } from "vitest";

describe("SimplexNoise", () => {
  it("returns deterministic 2D values for a fixed seed", () => {
    const a = new SimplexNoise(),
      b = new SimplexNoise();

    a.noise2d.seed(1234);
    b.noise2d.seed(1234);

    const va = a.noise2d.noise(0.5, 0.75),
      vb = b.noise2d.noise(0.5, 0.75);

    expect(Number.isFinite(va)).to.be.true;
    expect(va).to.equal(vb);
    expect(Math.abs(va)).to.be.lessThanOrEqual(1);
  });

  it("produces different values for different seeds", () => {
    const a = new SimplexNoise(),
      b = new SimplexNoise();

    a.noise2d.seed(1);
    b.noise2d.seed(2);

    expect(a.noise2d.noise(0.33, 0.66)).to.not.equal(b.noise2d.noise(0.33, 0.66));
  });

  it("supports bounded 3D and 4D sampling", () => {
    const n = new SimplexNoise(),
      samples: [number, number, number, number][] = [
        [0.1, 0.2, 0.3, 0.4],
        [0.5, 0.5, 0.5, 0.5],
      ];

    n.noise3d.seed(42);
    n.noise4d.seed(42);

    for (const [x, y, z, w] of samples) {
      expect(Math.abs(n.noise3d.noise(x, y, z))).to.be.lessThanOrEqual(1);
      expect(Math.abs(n.noise4d.noise(x, y, z, w))).to.be.lessThanOrEqual(1);
    }
  });
});
