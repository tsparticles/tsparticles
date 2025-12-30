import { type IDelta, ParticlesInteractorBase, getRandom } from "@tsparticles/engine";
import type { InfectableContainer, InfectableParticle } from "./Types.js";

const minStagesCount = 1,
    double = 2;

/**
 */
export class ParticlesInfecter extends ParticlesInteractorBase<InfectableContainer> {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(container: InfectableContainer) {
        super(container);
    }

    clear(): void {
        // do nothing
    }

    init(): void {
        // do nothing
    }

    interact(p1: InfectableParticle, delta: IDelta): void {
        const infecter = this.container.infecter;

        if (!infecter) {
            return;
        }

        infecter.updateInfection(p1, delta.value);

        if (p1.infection?.stage === undefined) {
            return;
        }

        const container = this.container,
            options = container.actualOptions,
            infectionOptions = options.infection;

        if (!infectionOptions?.enable || infectionOptions.stages.length < minStagesCount) {
            return;
        }

        const infectionStage1 = infectionOptions.stages[p1.infection.stage];

        if (!infectionStage1) {
            return;
        }

        const pxRatio = container.retina.pixelRatio,
            radius = p1.getRadius() * double + infectionStage1.radius * pxRatio,
            pos = p1.getPosition(),
            infectedStage1 = infectionStage1.infectedStage ?? p1.infection.stage,
            query = container.particles.quadTree.queryCircle(pos, radius),
            infections = infectionStage1.rate,
            neighbors = query.length;

        for (const p2 of query) {
            const infP2 = p2 as InfectableParticle;

            if (
                infP2 === p1 ||
                infP2.destroyed ||
                infP2.spawning ||
                !(infP2.infection?.stage === undefined || infP2.infection.stage !== p1.infection.stage) ||
                getRandom() >= infections / neighbors
            ) {
                continue;
            }

            if (infP2.infection?.stage === undefined) {
                infecter.startInfection(infP2, infectedStage1);
            } else if (infP2.infection.stage < p1.infection.stage) {
                infecter.updateInfectionStage(infP2, infectedStage1);
            } else if (infP2.infection.stage > p1.infection.stage) {
                const infectionStage2 = infectionOptions.stages[infP2.infection.stage];

                if (!infectionStage2) {
                    continue;
                }

                const infectedStage2 = infectionStage2.infectedStage ?? infP2.infection.stage;

                infecter.updateInfectionStage(p1, infectedStage2);
            }
        }
    }

    isEnabled(): boolean {
        return this.container.actualOptions.infection?.enable ?? false;
    }

    reset(): void {
        // do nothing
    }
}
