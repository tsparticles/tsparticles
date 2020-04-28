import { Particle } from "../../Particle";
import { Container } from "../../Container";

export class Infecter {
    public static infect(p1: Particle, container: Container): void {
        if (p1.infectionStage === undefined) {
            return;
        }

        const options = container.options;
        const infectionOptions = options.infection;

        if (!infectionOptions.enable || infectionOptions.stages.length < 1) {
            return;
        }

        const infectionStage = infectionOptions.stages[p1.infectionStage];
        const pxRatio = container.retina.pixelRatio;
        const radius = p1.size.value * 2 + infectionStage.radius * pxRatio;
        const pos = {
            x: p1.position.x + p1.offset.x,
            y: p1.position.y + p1.offset.y,
        };

        const infectedStage = infectionStage.infectedStage ?? p1.infectionStage;

        const query = container.particles.spatialGrid.queryRadius(pos, radius)
            .filter((t) => t.infectionStage === undefined || t.infectionStage !== p1.infectionStage);

        const infections = infectionStage.rate;
        const neighbors = query.length;

        for (const particle of query) {
            if (Math.random() < infections / neighbors) {
                if (particle.infectionStage === undefined) {
                    particle.startInfection(infectedStage);
                } else if (particle.infectionStage < infectedStage) {
                    particle.updateInfection(infectedStage);
                }
            }
        }
    }
}