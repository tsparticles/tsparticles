import type { IInfection } from "../../Interfaces/Infection/IInfection";
import type { RecursivePartial } from "../../../Types";
import { InfectionStage } from "./InfectionStage";
import type { IOptionLoader } from "../../Interfaces/IOptionLoader";

/**
 * [[include:Options/Infection.md]]
 * @category Options
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

        this.stages = data.stages.map((t) => {
            const s = new InfectionStage();

            s.load(t);

            return s;
        });
    }
}
