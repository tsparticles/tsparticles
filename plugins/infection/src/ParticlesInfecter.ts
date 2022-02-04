import type { Engine, IDelta } from "tsparticles";
import { ParticlesInteractorBase, WorkerQueryType } from "tsparticles";
import type { InfectableContainer, InfectableParticle } from "./Types";
import type { IInfectionOptions } from "./Options/Interfaces/IInfectionOptions";

/**
 * @category Interactions
 */
export class ParticlesInfecter extends ParticlesInteractorBase {
    readonly #engine;

    constructor(engine: Engine, container: InfectableContainer) {
        super(container);

        this.#engine = engine;
    }

    isEnabled(): boolean {
        const infOptions = this.container.actualOptions as unknown as IInfectionOptions;

        return infOptions?.infection?.enable ?? false;
    }

    reset(): void {
        // do nothing
    }

    async interact(p1: InfectableParticle, delta: IDelta): Promise<void> {
        const infecter = (this.container as InfectableContainer).infecter;

        if (!infecter) {
            return;
        }

        infecter.updateInfection(p1, delta.value);

        if (p1.infection.stage === undefined) {
            return;
        }

        const container = this.container;
        const options = container.actualOptions as unknown as IInfectionOptions;
        const infectionOptions = options.infection;

        if (!infectionOptions.enable || infectionOptions.stages.length < 1) {
            return;
        }

        const infectionStage1 = infectionOptions.stages[p1.infection.stage];
        const pxRatio = container.retina.pixelRatio;
        const radius = p1.getRadius() * 2 + infectionStage1.radius * pxRatio;
        const pos = p1.getPosition();
        const infectedStage1 = infectionStage1.infectedStage ?? p1.infection.stage;

        const infections = infectionStage1.rate;

        const queryId = await this.#engine.queryTree(
            {
                queryId: "particles-repulser",
                queryType: WorkerQueryType.circle,
                radius: radius,
                position: pos,
                containerId: container.treeId,
            },
            (containerId, qid, ids) => {
                if (container.treeId !== containerId || queryId !== qid) {
                    return;
                }

                const neighbors = ids.length;

                for (const id of ids) {
                    const p2 = container.particles.getParticle(id);
                    const infP2 = p2 as InfectableParticle;

                    if (
                        infP2 === p1 ||
                        infP2.destroyed ||
                        infP2.spawning ||
                        !(infP2.infection.stage === undefined || infP2.infection.stage !== p1.infection.stage)
                    ) {
                        continue;
                    }

                    if (Math.random() < infections / neighbors) {
                        if (infP2.infection.stage === undefined) {
                            infecter.startInfection(infP2, infectedStage1);
                        } else if (p1.infection.stage === undefined) {
                            const infectionStage2 = infectionOptions.stages[infP2.infection.stage];
                            const infectedStage2 = infectionStage2?.infectedStage ?? infP2.infection.stage;

                            infecter.updateInfectionStage(p1, infectedStage2);
                        } else if (infP2.infection.stage < p1.infection.stage) {
                            infecter.updateInfectionStage(infP2, infectedStage1);
                        } else if (infP2.infection.stage > p1.infection.stage) {
                            const infectionStage2 = infectionOptions.stages[infP2.infection.stage];
                            const infectedStage2 = infectionStage2?.infectedStage ?? infP2.infection.stage;

                            infecter.updateInfectionStage(p1, infectedStage2);
                        }
                    }
                }
            }
        );
    }
}
