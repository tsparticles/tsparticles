/* eslint-disable */
import {
  AnimationStatus,
  DestroyType,
  type IDelta,
  type IParticleNumericValueAnimation,
  type Particle,
  type RangedAnimationValueWithRandom,
} from "@tsparticles/engine";
import { initParticleNumericAnimationValue, updateAnimation } from "./index.js";
import { describe, expect, it } from "vitest";

function createParticle() {
  return { destroyed: false, destroy: (): void => {} } as unknown as Particle;
}

describe("animation-utils", () => {
  it("initParticleNumericAnimationValue resolves range and animation state", () => {
    const res = initParticleNumericAnimationValue(
      {
        value: 5,
        animation: {
          enable: true,
          mode: "increase",
          startValue: "min",
          speed: 1,
          decay: 0,
          delay: 0,
          count: 0,
          sync: true,
        },
      } as unknown as RangedAnimationValueWithRandom,
      2,
    );

    expect(res.min).to.equal(10);
    expect(res.max).to.equal(10);
    expect(res.value).to.equal(10);
    expect(res.enable).to.be.true;
    expect(res.status).to.equal(AnimationStatus.increasing);
    expect(res.initialValue).to.equal(10);
  });

  it("updateAnimation advances increasing values by velocity * factor", () => {
    const data: IParticleNumericValueAnimation = {
        enable: true,
        value: 10,
        min: 0,
        max: 100,
        status: AnimationStatus.increasing,
        velocity: 2,
        loops: 0,
        maxLoops: 5,
        time: 0,
      } as IParticleNumericValueAnimation,
      particle = createParticle();

    updateAnimation(particle, data, true, DestroyType.none, { value: 16, factor: 0.5 } as IDelta);

    expect(data.value).to.equal(11);
    expect(data.status).to.equal(AnimationStatus.increasing);
  });

  it("updateAnimation flips direction at bounds when changeDirection is true", () => {
    const data: IParticleNumericValueAnimation = {
        enable: true,
        value: 99,
        min: 0,
        max: 100,
        status: AnimationStatus.increasing,
        velocity: 10,
        loops: 0,
        time: 0,
      } as IParticleNumericValueAnimation,
      particle = createParticle();

    updateAnimation(particle, data, true, DestroyType.none, { value: 16, factor: 1 } as IDelta);

    expect(data.status).to.equal(AnimationStatus.decreasing);
    expect(data.value).to.equal(100);
    expect(data.loops).to.equal(1);
  });

  it("updateAnimation does nothing when disabled", () => {
    const data: IParticleNumericValueAnimation = {
        enable: false,
        value: 5,
        min: 0,
        max: 10,
        status: AnimationStatus.increasing,
        velocity: 1,
      } as IParticleNumericValueAnimation,
      particle = createParticle();

    updateAnimation(particle, data, true, DestroyType.none, { value: 16, factor: 1 } as IDelta);

    expect(data.value).to.equal(5);
  });
});
