import { type IContainerPlugin, type IOptionsColor, type Particle, itemFromArray } from "@tsparticles/engine";
import type { InfectableContainer, InfectableParticle } from "./Types.js";
import { Infecter } from "./Infecter.js";

const minStage = 0;

export class InfectionPluginInstance implements IContainerPlugin {
  /** The particles container */
  readonly #container;

  /**
   * Creates a new InfectionPluginInstance
   * @param container - the infectable container
   */
  constructor(container: InfectableContainer) {
    this.#container = container;
    this.#container.infecter = new Infecter(this.#container);
  }

  particleFillColor(particle: InfectableParticle): string | IOptionsColor | undefined {
    const options = this.#container.actualOptions;

    if (!particle.infection || !options.infection) {
      return;
    }

    const infectionStage = particle.infection.stage,
      infection = options.infection,
      infectionStages = infection.stages;

    return infectionStage === undefined ? undefined : infectionStages[infectionStage]?.color;
  }

  particleStrokeColor(particle: Particle): string | IOptionsColor | undefined {
    return this.particleFillColor(particle);
  }

  particlesSetup(): void {
    const options = this.#container.actualOptions;

    if (!options.infection) {
      return;
    }

    for (let i = 0; i < options.infection.infections; i++) {
      const notInfected = this.#container.particles.filter(p => {
          const infP = p as InfectableParticle;

          infP.infection ??= {};

          return infP.infection.stage === undefined;
        }),
        infected = itemFromArray(notInfected);

      if (!infected) {
        continue;
      }

      this.#container.infecter?.startInfection(infected, minStage);
    }
  }
}
