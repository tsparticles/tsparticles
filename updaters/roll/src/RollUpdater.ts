import {
  type IDelta,
  type IParticleTransformValues,
  type IParticleUpdater,
  type Particle,
  type PluginManager,
  type RecursivePartial,
} from "@tsparticles/engine";
import type { IRollParticlesOptions, RollParticle, RollParticlesOptions } from "./Types.js";
import { initParticle, updateRoll } from "./Utils.js";
import { Roll } from "./Options/Classes/Roll.js";

/** Roll updater plugin */
export class RollUpdater implements IParticleUpdater {
  /** The plugin manager */
  private readonly _pluginManager;

  /**
   * RollUpdater constructor
   * @param pluginManager
   */
  constructor(pluginManager: PluginManager) {
    this._pluginManager = pluginManager;
  }

  /**
   * Gets the transform values for the roll effect
   * @param particle
   */
  getTransformValues(particle: Particle): Partial<IParticleTransformValues> {
    const roll = particle.roll?.enable && particle.roll,
      rollHorizontal = roll && roll.horizontal,
      rollVertical = roll && roll.vertical;

    return {
      a: rollHorizontal ? Math.cos(roll.angle) : undefined,
      d: rollVertical ? Math.sin(roll.angle) : undefined,
    };
  }

  /**
   * Initializes the particle roll
   * @param particle
   */
  init(particle: RollParticle): void {
    initParticle(this._pluginManager, particle);
  }

  /**
   * Checks if roll is enabled for the particle
   * @param particle
   */
  isEnabled(particle: RollParticle): boolean {
    const roll = particle.options.roll;

    return !particle.destroyed && !particle.spawning && !!roll?.enable;
  }

  /**
   * Loads the roll options
   * @param options
   * @param sources
   */
  loadOptions(
    options: RollParticlesOptions,
    ...sources: (RecursivePartial<IRollParticlesOptions> | undefined)[]
  ): void {
    options.roll ??= new Roll();

    for (const source of sources) {
      options.roll.load(source?.roll);
    }
  }

  /**
   * Updates the particle roll
   * @param particle
   * @param delta
   */
  update(particle: Particle, delta: IDelta): void {
    if (!this.isEnabled(particle)) {
      return;
    }

    updateRoll(particle, delta);
  }
}
