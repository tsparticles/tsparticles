/* eslint-disable */
import { NoiseFieldGenerator } from "./index.js";
import { describe, expect, it } from "vitest";

class TestNoiseFieldGenerator extends NoiseFieldGenerator {
  constructor(container: unknown, noiseGen: unknown) {
    super(container as never, noiseGen as never);
  }
}

const noiseGen = {
    noise4d: () => 0,
    seed: () => {},
  },
  container = {};

describe("NoiseFieldGenerator", () => {
  it("returns the origin when the field is empty", () => {
    const generator = new TestNoiseFieldGenerator(container, noiseGen),
      particle = { getPosition: () => ({ x: 0, y: 0, z: 0 }) },
      res = generator.generate(particle as never);

    expect(res.x).to.equal(0);
    expect(res.y).to.equal(0);
  });

  it("has an inert reset", () => {
    const generator = new TestNoiseFieldGenerator(container, noiseGen);

    expect(() => generator.reset()).to.not.throw();
  });

  it("starts with an empty field and zero noise weight", () => {
    const generator = new TestNoiseFieldGenerator(container, noiseGen);

    expect(generator.field.length).to.equal(0);
    expect(generator.noiseW).to.equal(0);
  });
});
