import {
  type Container,
  type IDelta,
  type IParticleUpdater,
  type RecursivePartial,
  doublePI,
  getRangeValue,
  loadOptionProperty,
} from "@tsparticles/engine";
import type {
  IWobbleParticlesOptions,
  WobbleParticle,
  WobbleParticlesOptions,
} from "./Types.js";
import { Wobble } from "./Options/Classes/Wobble.js";
import { updateWobble } from "./Utils.js";

const maxAngle = 360,
  moveSpeedFactor = 10,
  defaultDistance = 0;

/**
 * The Wobble updater plugin
 */
export class WobbleUpdater implements IParticleUpdater {
  readonly #container;

  /**
   * The Wobble updater plugin constructor, assigns the container using the plugin
   * @param container - the container using the plugin
   */
  constructor(container: Container) {
    this.#container = container;
  }

  /**
   * Initializing the particle for wobble animation
   * @param particle - the particle to init
   */
  init(particle: WobbleParticle): void {
    const wobbleOpt = particle.options.wobble;

    if (wobbleOpt?.enable) {
      particle.wobble = {
        angle: this.#container.engine.getRandom() * doublePI,
        angleSpeed:
          getRangeValue(
            wobbleOpt.speed.angle,
            this.#container.engine.getRandomFn(),
          ) / maxAngle,
        moveSpeed:
          getRangeValue(
            wobbleOpt.speed.move,
            this.#container.engine.getRandomFn(),
          ) / moveSpeedFactor,
      };
    } else {
      particle.wobble = {
        angle: 0,
        angleSpeed: 0,
        moveSpeed: 0,
      };
    }

    particle.retina.wobbleDistance =
      getRangeValue(
        wobbleOpt?.distance ?? defaultDistance,
        this.#container.engine.getRandomFn(),
      ) * this.#container.retina.pixelRatio;
  }

  /**
   * Checks if the given particle needs the wobble animation
   * @param particle - The particle to process
   * @returns true if the particle needs the wobble animation, false otherwise
   */
  isEnabled(particle: WobbleParticle): boolean {
    return (
      !particle.destroyed &&
      !particle.spawning &&
      !!particle.options.wobble?.enable
    );
  }

  loadOptions(
    options: WobbleParticlesOptions,
    ...sources: (RecursivePartial<IWobbleParticlesOptions> | undefined)[]
  ): void {
    loadOptionProperty(options, "wobble", Wobble, ...sources);
  }

  /**
   * Updates the particle wobble animation
   * @param particle - the particle to update
   * @param delta - this variable contains the delta between the current frame and the previous frame
   */
  update(particle: WobbleParticle, delta: IDelta): void {
    if (!this.isEnabled(particle)) {
      return;
    }

    updateWobble(this.#container, particle, delta);
  }
}
