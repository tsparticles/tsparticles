import type { IContainerPlugin, IOptionsColor, Particle } from "tsparticles-engine";
import type { InfectableContainer, InfectableParticle } from "./Types";
import { Infecter } from "./Infecter";
import { itemFromArray } from "tsparticles-engine";

export class InfectionInstance implements IContainerPlugin {
    constructor(private readonly container: InfectableContainer) {
        this.container.infecter = new Infecter(this.container);
    }

    particleFillColor(particle: InfectableParticle): string | IOptionsColor | undefined {
        const options = this.container.actualOptions;

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
        const options = this.container.actualOptions;

        if (!options.infection) {
            return;
        }

        for (let i = 0; i < options.infection.infections; i++) {
            const notInfected = this.container.particles.array.filter((p) => {
                const infP = p as InfectableParticle;

                if (!infP.infection) {
                    infP.infection = {};
                }

                return infP.infection.stage === undefined;
            });

            const infected = itemFromArray(notInfected) as InfectableParticle;

            this.container.infecter?.startInfection(infected, 0);
        }
    }
}
