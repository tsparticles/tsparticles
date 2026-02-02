import {
  AnimationStatus,
  type Container,
  DestroyType,
  type IDelta,
  type IParticleNumericValueAnimation,
  type IParticleUpdater,
  type IParticlesOptions,
  type Particle,
  type ParticlesOptions,
  type RecursivePartial,
  RotateDirection,
  degToRad,
  double,
  doublePI,
  getRandom,
  getRangeValue,
  identity,
  updateAnimation,
} from "@tsparticles/engine";
import type { IRotate } from "./Options/Interfaces/IRotate.js";
import { Rotate } from "./Options/Classes/Rotate.js";

type RotateParticle = Particle & {
  options: RotateParticlesOptions;
  rotate?: IParticleNumericValueAnimation;
};

type IRotateParticlesOptions = IParticlesOptions & {
  rotate?: IRotate;
};

type RotateParticlesOptions = ParticlesOptions & {
  rotate?: Rotate;
};

const doublePIDeg = 360;

export class RotateUpdater implements IParticleUpdater {
  private readonly container;

  constructor(container: Container) {
    this.container = container;
  }

  init(particle: RotateParticle): void {
    const rotateOptions = particle.options.rotate;

    if (!rotateOptions) {
      return;
    }

    particle.rotate = {
      enable: rotateOptions.animation.enable,
      value: degToRad(getRangeValue(rotateOptions.value)),
      min: 0,
      max: doublePI,
    };

    particle.pathRotation = rotateOptions.path;

    let rotateDirection = rotateOptions.direction;

    if (rotateDirection === RotateDirection.random) {
      const index = Math.floor(getRandom() * double),
        minIndex = 0;

      rotateDirection = index > minIndex ? RotateDirection.counterClockwise : RotateDirection.clockwise;
    }

    switch (rotateDirection) {
      case RotateDirection.counterClockwise:
      case "counterClockwise":
        particle.rotate.status = AnimationStatus.decreasing;
        break;
      case RotateDirection.clockwise:
        particle.rotate.status = AnimationStatus.increasing;
        break;
      default:
        // no-op
        break;
    }

    const rotateAnimation = rotateOptions.animation;

    if (rotateAnimation.enable) {
      particle.rotate.decay = identity - getRangeValue(rotateAnimation.decay);
      particle.rotate.velocity =
        (getRangeValue(rotateAnimation.speed) / doublePIDeg) * this.container.retina.reduceFactor;

      if (!rotateAnimation.sync) {
        particle.rotate.velocity *= getRandom();
      }
    }

    particle.rotation = particle.rotate.value;
  }

  isEnabled(particle: RotateParticle): boolean {
    const rotate = particle.options.rotate;

    if (!rotate) {
      return false;
    }

    return !particle.destroyed && !particle.spawning && (!!rotate.value || rotate.animation.enable || rotate.path);
  }

  loadOptions(
    options: RotateParticlesOptions,
    ...sources: (RecursivePartial<IRotateParticlesOptions> | undefined)[]
  ): void {
    options.rotate ??= new Rotate();

    for (const source of sources) {
      options.rotate.load(source?.rotate);
    }
  }

  update(particle: RotateParticle, delta: IDelta): void {
    if (!this.isEnabled(particle)) {
      return;
    }

    particle.isRotating = !!particle.rotate;

    if (!particle.rotate) {
      return;
    }

    updateAnimation(particle, particle.rotate, false, DestroyType.none, delta);

    particle.rotation = particle.rotate.value;
  }
}
