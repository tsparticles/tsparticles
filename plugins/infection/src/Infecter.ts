import type { InfectableContainer, InfectableParticle } from "./Types";

/**
 */
export class Infecter {
    private readonly _container;

    constructor(container: InfectableContainer) {
        this._container = container;
    }

    startInfection(particle: InfectableParticle, stage: number): void {
        const options = this._container.actualOptions;

        if (!options.infection || !particle.infection) {
            return;
        }

        const stages = options.infection.stages,
            stagesCount = stages.length;

        if (stage > stagesCount || stage < 0) {
            return;
        }

        particle.infection.delay = 0;
        particle.infection.delayStage = stage;
    }

    updateInfection(particle: InfectableParticle, delta: number): void {
        const infectionOptions = this._container.actualOptions.infection;

        if (!infectionOptions || !particle.infection) {
            return;
        }

        const stages = infectionOptions.stages,
            stagesCount = stages.length,
            { infection } = particle;

        if (infection.delay !== undefined && infection.delayStage !== undefined) {
            const stage = infection.delayStage;

            if (stage > stagesCount || stage < 0) {
                return;
            }

            if (infection.delay >= infectionOptions.delay * 1000) {
                infection.stage = stage;
                infection.time = 0;

                delete infection.delay;
                delete infection.delayStage;
            } else {
                infection.delay += delta;
            }
        } else {
            delete infection.delay;
            delete infection.delayStage;
        }

        if (infection.stage !== undefined && infection.time !== undefined) {
            const infectionStage = stages[infection.stage];

            if (infectionStage.duration !== undefined && infectionStage.duration >= 0) {
                if (infection.time > infectionStage.duration * 1000) {
                    this.nextInfectionStage(particle);
                } else {
                    infection.time += delta;
                }
            } else {
                infection.time += delta;
            }
        } else {
            delete infection.stage;
            delete infection.time;
        }
    }

    updateInfectionStage(particle: InfectableParticle, stage: number): void {
        const options = this._container.actualOptions,
            { infection } = particle;

        if (!options.infection || !infection) {
            return;
        }

        const stagesCount = options.infection.stages.length;

        if (stage > stagesCount || stage < 0 || (infection.stage !== undefined && infection.stage > stage)) {
            return;
        }

        infection.stage = stage;
        infection.time = 0;
    }

    private nextInfectionStage(particle: InfectableParticle): void {
        const options = this._container.actualOptions,
            { infection } = particle;

        if (!options.infection || !infection) {
            return;
        }

        const stagesCount = options.infection.stages.length;

        if (stagesCount <= 0 || infection.stage === undefined) {
            return;
        }

        infection.time = 0;

        if (stagesCount <= ++infection.stage) {
            if (options.infection.cure) {
                delete infection.stage;
                delete infection.time;
                return;
            } else {
                infection.stage = 0;
                infection.time = 0;
            }
        }
    }
}
