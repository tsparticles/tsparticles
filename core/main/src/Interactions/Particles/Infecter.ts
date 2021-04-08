import type { Particle } from "../../Core/Particle";
import type { Container } from "../../Core/Container";
import type { IParticlesInteractor } from "../../Core/Interfaces/IParticlesInteractor";
import type { IDelta } from "../../Core/Interfaces/IDelta";

/**
 * @category Interactions
 */
export class Infecter implements IParticlesInteractor {
    constructor(private readonly container: Container) {}

    isEnabled(): boolean {
        return this.container.actualOptions.infection.enable;
    }

    reset(): void {
        // do nothing
    }

    interact(p1: Particle, delta: IDelta): void {
        const infecter1 = p1.infecter;

        infecter1.updateInfection(delta.value);

        if (infecter1.infectionStage === undefined) {
            return;
        }

        const container = this.container;
        const options = container.actualOptions;
        const infectionOptions = options.infection;

        if (!infectionOptions.enable || infectionOptions.stages.length < 1) {
            return;
        }

        const infectionStage1 = infectionOptions.stages[infecter1.infectionStage];
        const pxRatio = container.retina.pixelRatio;
        const radius = p1.getRadius() * 2 + infectionStage1.radius * pxRatio;
        const pos = p1.getPosition();
        const infectedStage1 = infectionStage1.infectedStage ?? infecter1.infectionStage;
        const query = container.particles.quadTree.queryCircle(pos, radius);
        const infections = infectionStage1.rate;
        const neighbors = query.length;

        for (const p2 of query) {
            if (
                p2 === p1 ||
                p2.destroyed ||
                p2.spawning ||
                !(p2.infecter.infectionStage === undefined || p2.infecter.infectionStage !== infecter1.infectionStage)
            ) {
                continue;
            }

            const infecter2 = p2.infecter;

            if (Math.random() < infections / neighbors) {
                if (infecter2.infectionStage === undefined) {
                    infecter2.startInfection(infectedStage1);
                } else if (infecter2.infectionStage < infecter1.infectionStage) {
                    infecter2.updateInfectionStage(infectedStage1);
                } else if (infecter2.infectionStage > infecter1.infectionStage) {
                    const infectionStage2 = infectionOptions.stages[infecter2.infectionStage];
                    const infectedStage2 = infectionStage2?.infectedStage ?? infecter2.infectionStage;

                    infecter1.updateInfectionStage(infectedStage2);
                }
            }
        }
    }
}
