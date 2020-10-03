import type { IInfectionStage } from "../../Interfaces/Infection/IInfectionStage";
import { OptionsColor } from "../OptionsColor";
import type { RecursivePartial } from "../../../Types";
import type { IOptionLoader } from "../../Interfaces/IOptionLoader";

/**
 * @category Options
 */
export class InfectionStage implements IInfectionStage, IOptionLoader<IInfectionStage> {
    public color;
    public duration?: number;
    public infectedStage?: number;
    public radius;
    public rate;

    constructor() {
        this.color = new OptionsColor();
        this.color.value = "#ff0000";
        this.radius = 0;
        this.rate = 1;
    }

    public load(data?: RecursivePartial<IInfectionStage>): void {
        if (data === undefined) {
            return;
        }

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
