import type { Container, IDelta, Particle } from "tsparticles-core";
import { ParticlesInteractorBase } from "tsparticles-core";
import { Infecter } from "./Infecter";
import { InfectionInstance } from "./InfectionInstance";

/**
 * @category Interactions
 */
export class ParticlesInfecter extends ParticlesInteractorBase {
    constructor(container: Container, private readonly plugin: InfectionInstance) {
        super(container, "infection");
    }

    public isEnabled(): boolean {
        return this.container.options.infection.enable;
    }

    public reset(): void {
        // do nothing
    }

    public interact(p1: Particle, delta: IDelta): void {
        const infecter = this.plugin.infecter;

        infecter.updateInfection(p1, delta.value);

        if (p1.infection.stage === undefined) {
            return;
        }

        const container = this.container;
        const options = container.options;
        const infectionOptions = options.infection;

        if (!infectionOptions.enable || infectionOptions.stages.length < 1) {
            return;
        }

        const infectionStage1 = infectionOptions.stages[p1.infection.stage];
        const pxRatio = container.retina.pixelRatio;
        const radius = p1.getRadius() * 2 + infectionStage1.radius * pxRatio;
        const pos = p1.getPosition();
        const infectedStage1 = infectionStage1.infectedStage ?? p1.infection.stage;
        const query = container.particles.quadTree.queryCircle(pos, radius);
        const infections = infectionStage1.rate;
        const neighbors = query.length;

        for (const p2 of query) {
            if (
                p2 === p1 ||
                p2.destroyed ||
                p2.spawning ||
                !(p2.infection.stage === undefined || p2.infection.stage !== p1.infection.stage)
            ) {
                continue;
            }

            if (Math.random() < infections / neighbors) {
                if (p2.infection.stage === undefined) {
                    infecter.startInfection(p2, infectedStage1);
                } else if (p2.infection.stage < p1.infection.stage) {
                    infecter.updateInfectionStage(p2, infectedStage1);
                } else if (p2.infection.stage > p1.infection.stage) {
                    const infectionStage2 = infectionOptions.stages[p2.infection.stage];
                    const infectedStage2 = infectionStage2?.infectedStage ?? p2.infection.stage;

                    infecter.updateInfectionStage(p1, infectedStage2);
                }
            }
        }
    }
}
