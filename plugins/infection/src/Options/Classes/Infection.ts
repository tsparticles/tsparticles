import type { IOptionLoader, RecursivePartial } from "@tsparticles/engine";
import type { IInfection } from "../Interfaces/IInfection.js";
import { InfectionStage } from "./InfectionStage.js";

/**
 * [[include:Options/Plugins/Infection.md]]
 */
export class Infection implements IInfection, IOptionLoader<IInfection> {
    cure;
    delay;
    enable;
    infections;
    stages: InfectionStage[];

    constructor() {
        this.cure = false;
        this.delay = 0;
        this.enable = false;
        this.infections = 0;
        this.stages = [];
    }

    load(data?: RecursivePartial<IInfection>): void {
        if (data === undefined) {
            return;
        }

        if (data.cure !== undefined) {
            this.cure = data.cure;
        }

        if (data.delay !== undefined) {
            this.delay = data.delay;
        }

        if (data.enable !== undefined) {
            this.enable = data.enable;
        }

        if (data.infections !== undefined) {
            this.infections = data.infections;
        }

        if (data.stages === undefined) {
            return;
        }

        this.stages = data.stages.map(t => {
            const s = new InfectionStage();

            s.load(t);

            return s;
        });
    }
}
