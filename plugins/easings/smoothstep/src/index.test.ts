/* eslint-disable */
import { easingsFunctions } from "./easingsFunctions.js";
import { describe, expect, it } from "vitest";

describe("easing smoothstep", () => {
  it("exposes the in/out/in-out variants", () => {
    expect(easingsFunctions.size).to.equal(3);
  });

  it("returns deterministic, finite values across the curve", () => {
    const samples = [0, 0.25, 0.5, 0.75, 1];

    for (const [key, fn] of easingsFunctions) {
      for (const x of samples) {
        const value = fn(x);

        expect(Number.isFinite(value), key + "(" + x + ") not finite").to.be.true;
        expect(fn(x), key + "(" + x + ") not deterministic").to.equal(value);
      }
    }
  });

  it("anchors known values", () => {
    for (const [, fn] of easingsFunctions) {
      expect(fn(0)).to.equal(0);
      expect(fn(0.5)).to.equal(0.5);
      expect(fn(1)).to.equal(1);
    }
  });
});
