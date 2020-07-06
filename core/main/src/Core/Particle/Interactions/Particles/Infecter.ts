import type { Particle } from "../../../Particle";
import type { Container } from "../../../Container";
import { Circle } from "../../../../Utils";
import type { IParticlesInteractor } from "../../../Interfaces/IParticlesInteractor";
import type { IDelta } from "../../../Interfaces/IDelta";

export class Infecter implements IParticlesInteractor {
    constructor(private readonly container: Container) {}

    public isEnabled(): boolean {
        return this.container.options.infection.enable;
    }

    public reset(): void {
        // do nothing
    }

    public interact(p1: Particle, delta: IDelta): void {
        const infecter1 = p1.infecter;

        infecter1.updateInfection(delta.value);

        if (infecter1.infectionStage === undefined) {
            return;
        }

        const container = this.container;
        const options = container.options;
        const infectionOptions = options.infection;

        if (!infectionOptions.enable || infectionOptions.stages.length < 1) {
            return;
        }

        const infectionStage1 = infectionOptions.stages[infecter1.infectionStage];
        const pxRatio = container.retina.pixelRatio;
        const radius = p1.size.value * 2 + infectionStage1.radius * pxRatio;
        const pos = p1.getPosition();

        const infectedStage1 = infectionStage1.infectedStage ?? infecter1.infectionStage;

        //const query = container.particles.spatialGrid.queryRadius(pos, radius)
        const query = container.particles.quadTree
            .query(new Circle(pos.x, pos.y, radius))
            .filter(
                (p) => p.infecter.infectionStage === undefined || p.infecter.infectionStage !== infecter1.infectionStage
            );

        const infections = infectionStage1.rate;
        const neighbors = query.length;

        for (const p2 of query) {
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
