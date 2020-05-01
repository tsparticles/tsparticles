import type { IInfectionStage } from "../../Interfaces/Infection/IInfectionStage";
import { OptionsColor } from "../Particles/OptionsColor";
import type { RecursivePartial } from "../../../Types/RecursivePartial";

export class InfectionStage implements IInfectionStage {
    public color: OptionsColor;
    public duration?: number;
    public infectedStage?: number;
    public radius: number;
    public rate: number;

    constructor() {
        this.color = new OptionsColor();
        this.color.value = "#ff0000";
        this.radius = 0;
        this.rate = 1;
    }

    public load(data?: RecursivePartial<IInfectionStage>): void {
        if (data !== undefined) {
            if (data.color !== undefined) {
                this.color = OptionsColor.create(this.color, data.color);
            }

            this.duration = data.duration;
            this.infectedStage = data.infectedStage;

            if (data.radius !== undefined) {
                this.radius = data.radius;
            }

            if (data.rate !== undefined) {
                this.rate = data.rate;
            }
        }
    }
}
