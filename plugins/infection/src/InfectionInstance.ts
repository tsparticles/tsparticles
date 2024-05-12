import { type IContainerPlugin, type IOptionsColor, type Particle, itemFromArray } from "@tsparticles/engine";
import type { InfectableContainer, InfectableParticle } from "./Types.js";
import { Infecter } from "./Infecter.js";

const minStage = 0;

export class InfectionInstance implements IContainerPlugin {
    private readonly _container;

    constructor(container: InfectableContainer) {
        this._container = container;
        this._container.infecter = new Infecter(this._container);
    }

    particleFillColor(particle: InfectableParticle): string | IOptionsColor | undefined {
        const options = this._container.actualOptions;

        if (!particle.infection || !options.infection) {
            return;
        }

        const infectionStage = particle.infection.stage,
            infection = options.infection,
            infectionStages = infection.stages;

        return infectionStage !== undefined ? infectionStages[infectionStage].color : undefined;
    }

    particleStrokeColor(particle: Particle): string | IOptionsColor | undefined {
        return this.particleFillColor(particle);
    }

    particlesSetup(): void {
        const options = this._container.actualOptions;

        if (!options.infection) {
            return;
        }

        for (let i = 0; i < options.infection.infections; i++) {
            const notInfected = this._container.particles.filter(p => {
                const infP = p as InfectableParticle;

                if (!infP.infection) {
                    infP.infection = {};
                }

                return infP.infection.stage === undefined;
            });

            const infected = itemFromArray(notInfected);

            this._container.infecter?.startInfection(infected, minStage);
        }
    }
}
