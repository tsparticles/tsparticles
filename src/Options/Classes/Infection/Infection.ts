import type { IInfection } from "../../Interfaces/Infection/IInfection";
import type { RecursivePartial } from "../../../Types/RecursivePartial";
import { InfectionStage } from "./InfectionStage";

export class Infection implements IInfection {
    public cure: boolean;
    public delay: number;
    public enable: boolean;
    public infections: number;
    public stages: InfectionStage[];

    constructor() {
        this.cure = false;
        this.delay = 0;
        this.enable = false;
        this.infections = 0;
        this.stages = [];
    }

    public load(data?: RecursivePartial<IInfection>): void {
        if (data !== undefined) {
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

            if (data.stages !== undefined) {
                this.stages = data.stages.map((t) => {
                    const s = new InfectionStage();

                    s.load(t);

                    return s;
                });
            }
        }
    }

}

