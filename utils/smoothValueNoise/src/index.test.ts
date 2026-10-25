/* eslint-disable */
import { SmoothValueNoise } from "./index.js";
import { describe, expect, it } from "vitest";

describe("SmoothValueNoise", () => {
  it("returns deterministic bounded values for the same seed", () => {
    const a = new SmoothValueNoise(),
      b = new SmoothValueNoise();

    a.seed(3);
    b.seed(3);

    const va = a.noise2d(0.4, 0.6);

    expect(Number.isFinite(va)).to.be.true;
    expect(va).to.equal(b.noise2d(0.4, 0.6));
    expect(Math.abs(va)).to.be.lessThanOrEqual(1);
  });

  it("changes with the seed", () => {
    const a = new SmoothValueNoise(),
      b = new SmoothValueNoise();

    a.seed(1);
    b.seed(2);

    expect(a.noise2d(0.4, 0.6)).to.not.equal(b.noise2d(0.4, 0.6));
  });

  it("supports bounded 3D and 4D sampling", () => {
    const n = new SmoothValueNoise();

    n.seed(11);

    for (const value of [n.noise3d(0.1, 0.2, 0.3), n.noise4d(0.1, 0.2, 0.3, 0.4)]) {
      expect(Number.isFinite(value)).to.be.true;
      expect(Math.abs(value)).to.be.lessThanOrEqual(1);
    }
  });
});
