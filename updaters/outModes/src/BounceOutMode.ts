import {
  type Container,
  type IContainerPlugin,
  type IDelta,
  OutMode,
  type OutModeDirection,
  type Particle,
  calculateBounds,
} from "@tsparticles/engine";
import { bounceHorizontal, bounceVertical } from "./Utils.js";
import type { IOutModeManager } from "./IOutModeManager.js";

/** Bounce out mode manager */
export class BounceOutMode implements IOutModeManager {
  /** Supported out modes */
  modes: (OutMode | keyof typeof OutMode)[];

  /** Particle bounce plugins */
  private readonly _particleBouncePlugins: IContainerPlugin[];

  /**
   * BounceOutMode constructor
   * @param container
   */
  constructor(private readonly container: Container) {
    this.modes = [
      OutMode.bounce,
      OutMode.split,
    ];
    this._particleBouncePlugins = container.plugins.filter(p => p.particleBounce !== undefined);
  }

  /**
   * Updates the particle bouncing off the canvas edges
   * @param particle
   * @param direction
   * @param delta
   * @param outMode
   */
  update(
    particle: Particle,
    direction: OutModeDirection,
    delta: IDelta,
    outMode: OutMode | keyof typeof OutMode,
  ): void {
    if (!this.modes.includes(outMode)) {
      return;
    }

    const container = this.container;
    let handled = false;

    for (const plugin of this._particleBouncePlugins) {
      handled = plugin.particleBounce?.(particle, delta, direction) ?? false;

      if (handled) {
        break;
      }
    }

    if (handled) {
      return;
    }

    const pos = particle.getPosition(),
      offset = particle.offset,
      size = particle.getRadius(),
      bounds = calculateBounds(pos, size),
      canvasSize = container.canvas.size;

    bounceHorizontal({ particle, outMode, direction, bounds, canvasSize, offset, size });
    bounceVertical({ particle, outMode, direction, bounds, canvasSize, offset, size });
  }
}
