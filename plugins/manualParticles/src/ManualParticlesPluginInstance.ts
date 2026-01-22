import { type IContainerPlugin, getPosition } from "@tsparticles/engine";
import type { ManualParticlesContainer } from "./types.js";

const noParticles = 0;

export class ManualParticlesPluginInstance implements IContainerPlugin {
  private readonly _container;

  constructor(container: ManualParticlesContainer) {
    this._container = container;
  }

  particlesDensityCount(): number {
    return this._container.actualOptions.manualParticles?.length ?? noParticles;
  }

  particlesInitialization(): boolean {
    const container = this._container,
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
