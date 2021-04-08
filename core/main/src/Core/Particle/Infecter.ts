import type { Container } from "../Container";

/**
 * @category Core
 */
export class Infecter {
    infectionStage?: number;
    infectionTime?: number;
    infectionDelay?: number;
    infectionDelayStage?: number;

    constructor(private readonly container: Container) {}

    startInfection(stage: number): void {
        const options = this.container.actualOptions;
        const stages = options.infection.stages;
        const stagesCount = stages.length;

        if (stage > stagesCount || stage < 0) {
            return;
        }

        this.infectionDelay = 0;
        this.infectionDelayStage = stage;
    }

    updateInfectionStage(stage: number): void {
        const options = this.container.actualOptions;
        const stagesCount = options.infection.stages.length;

        if (stage > stagesCount || stage < 0 || (this.infectionStage !== undefined && this.infectionStage > stage)) {
            return;
        }

        this.infectionStage = stage;
        this.infectionTime = 0;
    }

    updateInfection(delta: number): void {
        const options = this.container.actualOptions;
        const infection = options.infection;
        const stages = options.infection.stages;
        const stagesCount = stages.length;

        if (this.infectionDelay !== undefined && this.infectionDelayStage !== undefined) {
            const stage = this.infectionDelayStage;

            if (stage > stagesCount || stage < 0) {
                return;
            }

            if (this.infectionDelay > infection.delay * 1000) {
                this.infectionStage = stage;
                this.infectionTime = 0;

                delete this.infectionDelay;
                delete this.infectionDelayStage;
            } else {
                this.infectionDelay += delta;
            }
        } else {
            delete this.infectionDelay;
            delete this.infectionDelayStage;
        }

        if (this.infectionStage !== undefined && this.infectionTime !== undefined) {
            const infectionStage = stages[this.infectionStage];

            if (infectionStage.duration !== undefined && infectionStage.duration >= 0) {
                if (this.infectionTime > infectionStage.duration * 1000) {
                    this.nextInfectionStage();
                } else {
                    this.infectionTime += delta;
                }
            } else {
                this.infectionTime += delta;
            }
        } else {
            delete this.infectionStage;
            delete this.infectionTime;
        }
    }

    private nextInfectionStage(): void {
        const options = this.container.actualOptions;
        const stagesCount = options.infection.stages.length;

        if (stagesCount <= 0 || this.infectionStage === undefined) {
            return;
        }

        this.infectionTime = 0;

        if (stagesCount <= ++this.infectionStage) {
            if (options.infection.cure) {
                delete this.infectionStage;
                delete this.infectionTime;
                return;
            } else {
                this.infectionStage = 0;
                this.infectionTime = 0;
            }
        }
    }
}
