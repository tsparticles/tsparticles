import type { InfectableContainer, InfectableParticle } from "./Types.js";
import { millisecondsToSeconds } from "@tsparticles/engine";

const minStage = 0,
    minDuration = 0;

/**
 */
export class Infecter {
    private readonly _container;

    constructor(container: InfectableContainer) {
        this._container = container;
    }

    startInfection(particle: InfectableParticle, stage: number): void {
        const infectionOptions = this._container.actualOptions.infection,
            { infection } = particle;

        if (!infectionOptions || !infection) {
            return;
        }

        const stages = infectionOptions.stages,
            stagesCount = stages.length;

        if (stage > stagesCount || stage < minStage) {
            return;
        }

        infection.delay = 0;
        infection.delayStage = stage;
    }

    updateInfection(particle: InfectableParticle, delta: number): void {
        const infectionOptions = this._container.actualOptions.infection,
            { infection } = particle;

        if (!infectionOptions || !infection) {
            return;
        }

        const stages = infectionOptions.stages,
            stagesCount = stages.length;

        if (infection.delay !== undefined && infection.delayStage !== undefined) {
            const stage = infection.delayStage;

            if (stage > stagesCount || stage < minStage) {
                return;
            }

            if (infection.delay >= infectionOptions.delay * millisecondsToSeconds) {
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

            if (infectionStage.duration !== undefined && infectionStage.duration >= minDuration) {
                if (infection.time > infectionStage.duration * millisecondsToSeconds) {
                    this._nextInfectionStage(particle);
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

        if (stage > stagesCount || stage < minStage || (infection.stage !== undefined && infection.stage > stage)) {
            return;
        }

        infection.stage = stage;
        infection.time = 0;
    }

    private readonly _nextInfectionStage: (particle: InfectableParticle) => void = particle => {
        const infectionOptions = this._container.actualOptions.infection,
            { infection } = particle;

        if (!infectionOptions || !infection) {
            return;
        }

        const stagesCount = infectionOptions.stages.length;

        if (stagesCount <= minStage || infection.stage === undefined) {
            return;
        }

        infection.time = 0;

        if (stagesCount <= ++infection.stage) {
            if (infectionOptions.cure) {
                delete infection.stage;
                delete infection.time;
            } else {
                infection.stage = 0;
                infection.time = 0;
            }
        }
    };
}
