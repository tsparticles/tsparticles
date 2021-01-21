import type { Container, Particle } from "tsparticles-core";

/**
 * @category Core
 */
export class Infecter {
    constructor(private readonly container: Container) {}

    public startInfection(particle: Particle, stage: number): void {
        const options = this.container.options,
            stages = options.infection.stages,
            stagesCount = stages.length;

        if (stage > stagesCount || stage < 0) {
            return;
        }

        particle.infection.delay = 0;
        particle.infection.delayStage = stage;
    }

    public updateInfectionStage(particle: Particle, stage: number): void {
        const options = this.container.options,
            stagesCount = options.infection.stages.length;

        if (
            stage > stagesCount ||
            stage < 0 ||
            (particle.infection.stage !== undefined && particle.infection.stage > stage)
        ) {
            return;
        }

        particle.infection.stage = stage;
        particle.infection.time = 0;
    }

    public updateInfection(particle: Particle, delta: number): void {
        const options = this.container.options,
            infection = options.infection,
            stages = options.infection.stages,
            stagesCount = stages.length;

        if (particle.infection.delay !== undefined && particle.infection.delayStage !== undefined) {
            const stage = particle.infection.delayStage;

            if (stage > stagesCount || stage < 0) {
                return;
            }

            if (particle.infection.delay > infection.delay * 1000) {
                particle.infection.stage = stage;
                particle.infection.time = 0;

                delete particle.infection.delay;
                delete particle.infection.delayStage;
            } else {
                particle.infection.delay += delta;
            }
        } else {
            delete particle.infection.delay;
            delete particle.infection.delayStage;
        }

        if (particle.infection.stage !== undefined && particle.infection.time !== undefined) {
            const infectionStage = stages[particle.infection.stage];

            if (infectionStage.duration !== undefined && infectionStage.duration >= 0) {
                if (particle.infection.time > infectionStage.duration * 1000) {
                    this.nextInfectionStage(particle);
                } else {
                    particle.infection.time += delta;
                }
            } else {
                particle.infection.time += delta;
            }
        } else {
            delete particle.infection.stage;
            delete particle.infection.time;
        }
    }

    private nextInfectionStage(particle: Particle): void {
        const options = this.container.options,
            stagesCount = options.infection.stages.length;

        if (stagesCount <= 0 || particle.infection.stage === undefined) {
            return;
        }

        particle.infection.time = 0;

        if (stagesCount <= ++particle.infection.stage) {
            if (options.infection.cure) {
                delete particle.infection.stage;
                delete particle.infection.time;
                return;
            } else {
                particle.infection.stage = 0;
                particle.infection.time = 0;
            }
        }
    }
}
