import {
    type Container,
    type Particle,
    ParticlesInteractorBase,
    type RecursivePartial,
    Vector,
    clamp,
    getDistances,
    getRangeValue,
} from "@tsparticles/engine";
import type { IRepulseParticlesOptions, RepulseParticlesOptions } from "./Types.js";
import { ParticlesRepulse } from "./Options/Classes/ParticlesRepulse.js";

const minDistance = 0,
    identity = 1,
    squareExp = 2,
    minVelocity = 0;

type RepulseParticle = Particle & {
    options: RepulseParticlesOptions;
    repulse?: {
        distance: number;
        factor: number;
        speed: number;
    };
};

export class Repulser extends ParticlesInteractorBase {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(container: Container) {
        super(container);

        // do nothing
    }

    clear(): void {
        // do nothing
    }

    init(): void {
        // do nothing
    }

    interact(p1: RepulseParticle): void {
        const container = this.container;

        if (!p1.repulse) {
            const repulseOpt1 = p1.options.repulse;

            if (!repulseOpt1) {
                return;
            }

            p1.repulse = {
                distance: getRangeValue(repulseOpt1.distance) * container.retina.pixelRatio,
                speed: getRangeValue(repulseOpt1.speed),
                factor: getRangeValue(repulseOpt1.factor),
            };
        }

        const pos1 = p1.getPosition(),
            query = container.particles.quadTree.queryCircle(pos1, p1.repulse.distance);

        for (const p2 of query) {
            if (p1 === p2 || p2.destroyed) {
                continue;
            }

            const pos2 = p2.getPosition(),
                { dx, dy, distance } = getDistances(pos2, pos1),
                velocity = p1.repulse.speed * p1.repulse.factor;

            if (distance > minDistance) {
                const repulseFactor = clamp(
                        (identity - Math.pow(distance / p1.repulse.distance, squareExp)) * velocity,
                        minVelocity,
                        velocity,
                    ),
                    normVec = Vector.create((dx / distance) * repulseFactor, (dy / distance) * repulseFactor);

                p2.position.addTo(normVec);
            } else {
                const velocityVec = Vector.create(velocity, velocity);

                p2.position.addTo(velocityVec);
            }
        }
    }

    isEnabled(particle: RepulseParticle): boolean {
        return particle.options.repulse?.enabled ?? false;
    }

    loadParticlesOptions?(
        options: RepulseParticlesOptions,
        ...sources: (RecursivePartial<IRepulseParticlesOptions> | undefined)[]
    ): void {
        options.repulse ??= new ParticlesRepulse();

        for (const source of sources) {
            options.repulse.load(source?.repulse);
        }
    }

    reset(): void {
        // do nothing
    }
}
