import type { IContainerPlugin, IOptionsColor, Particle } from "tsparticles-engine";
import type { InfectableContainer, InfectableParticle } from "./Types";
import type { IInfectionOptions } from "./Options/Interfaces/IInfectionOptions";
import { Infecter } from "./Infecter";
import { itemFromArray } from "tsparticles-engine";

export class InfectionInstance implements IContainerPlugin {
    constructor(private readonly container: InfectableContainer) {
        this.container.infecter = new Infecter(this.container);
    }

    particleFillColor(particle: Particle): string | IOptionsColor | undefined {
        const infParticle = particle as unknown as InfectableParticle;
        const options = this.container.actualOptions as unknown as IInfectionOptions;

        if (!infParticle.infection) {
            return;
        }

        const infectionStage = infParticle.infection.stage;
        const infection = options.infection;
        const infectionStages = infection.stages;

        return infectionStage !== undefined ? infectionStages[infectionStage].color : undefined;
    }

    particleStrokeColor(particle: Particle): string | IOptionsColor | undefined {
        return this.particleFillColor(particle);
    }

    particlesSetup(): void {
        const options = this.container.actualOptions as unknown as IInfectionOptions;

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
