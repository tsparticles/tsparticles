import {
  AnimationStatus,
  type Container,
  DestroyType,
  type IDelta,
  type IParticleTransformValues,
  type IParticleUpdater,
  type RecursivePartial,
  degToRad,
  double,
  doublePI,
  getRandom,
  getRangeValue,
  half,
  identity,
  updateAnimation,
} from "@tsparticles/engine";
import type { ITiltParticlesOptions, TiltParticle, TiltParticlesOptions } from "./Types.js";
import { Tilt } from "./Options/Classes/Tilt.js";
import { TiltDirection } from "./TiltDirection.js";

const maxAngle = 360;

export class TiltUpdater implements IParticleUpdater {
  private readonly container;

  constructor(container: Container) {
    this.container = container;
  }

  getTransformValues(particle: TiltParticle): Partial<IParticleTransformValues> {
    const tilt = particle.tilt?.enable && particle.tilt;

    return {
      b: tilt ? Math.cos(tilt.value) * tilt.cosDirection : undefined,
      c: tilt ? Math.sin(tilt.value) * tilt.sinDirection : undefined,
    };
  }

  init(particle: TiltParticle): void {
    const tiltOptions = particle.options.tilt;

    if (!tiltOptions) {
      return;
    }

    particle.tilt = {
      enable: tiltOptions.enable,
      value: degToRad(getRangeValue(tiltOptions.value)),
      sinDirection: getRandom() >= half ? identity : -identity,
      cosDirection: getRandom() >= half ? identity : -identity,
      min: 0,
      max: doublePI,
    };

    let tiltDirection = tiltOptions.direction;

    if (tiltDirection === TiltDirection.random) {
      const index = Math.floor(getRandom() * double),
        minIndex = 0;

      tiltDirection = index > minIndex ? TiltDirection.counterClockwise : TiltDirection.clockwise;
    }

    switch (tiltDirection) {
      case TiltDirection.counterClockwise:
      case "counterClockwise":
        particle.tilt.status = AnimationStatus.decreasing;
        break;
      case TiltDirection.clockwise:
        particle.tilt.status = AnimationStatus.increasing;
        break;
    }

    const tiltAnimation = particle.options.tilt?.animation;

    if (tiltAnimation?.enable) {
      particle.tilt.decay = identity - getRangeValue(tiltAnimation.decay);
      particle.tilt.velocity = (getRangeValue(tiltAnimation.speed) / maxAngle) * this.container.retina.reduceFactor;

      if (!tiltAnimation.sync) {
        particle.tilt.velocity *= getRandom();
      }
    }
  }

  isEnabled(particle: TiltParticle): boolean {
    const tiltAnimation = particle.options.tilt?.animation;

    return !particle.destroyed && !particle.spawning && !!tiltAnimation?.enable;
  }

  loadOptions(
    options: TiltParticlesOptions,
    ...sources: (RecursivePartial<ITiltParticlesOptions> | undefined)[]
  ): void {
    options.tilt ??= new Tilt();

    for (const source of sources) {
      options.tilt.load(source?.tilt);
    }
  }

  update(particle: TiltParticle, delta: IDelta): void {
    if (!this.isEnabled(particle) || !particle.tilt) {
      return;
    }

    updateAnimation(particle, particle.tilt, false, DestroyType.none, delta);
  }
}
