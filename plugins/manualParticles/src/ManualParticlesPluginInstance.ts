import { type IContainerPlugin, getPosition } from "@tsparticles/engine";
import type { ManualParticlesContainer } from "./types.js";

const noParticles = 0;

export class ManualParticlesPluginInstance implements IContainerPlugin {
  /** The manual particles container */
  readonly #container;

  /**
   * Creates a new ManualParticlesPluginInstance
   * @param container - the manual particles container
   */
  constructor(container: ManualParticlesContainer) {
    this.#container = container;
  }

  particlesDensityCount(): number {
    return this.#container.actualOptions.manualParticles?.length ?? noParticles;
  }

  particlesInitialization(): boolean {
    const container = this.#container,
      options = container.actualOptions;

    options.manualParticles?.forEach(p =>
      container.particles.addParticle(
        p.position ? getPosition(p.position, container.canvas.size) : undefined,
        p.options,
      ),
    );

    return false;
  }
}
