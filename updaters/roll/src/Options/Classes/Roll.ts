import type { IOptionLoader, RangeValue, RecursivePartial } from "tsparticles-engine";
import { OptionsColor, setRangeValue } from "tsparticles-engine";
import type { IRoll } from "../Interfaces/IRoll";
import { RollLight } from "./RollLight";
import { RollMode } from "../../RollMode";

export class Roll implements IRoll, IOptionLoader<IRoll> {
    backColor?: OptionsColor;
    darken;
    enable;
    enlighten;
    mode: RollMode | keyof typeof RollMode;
    speed: RangeValue;

    constructor() {
        this.darken = new RollLight();
        this.enable = false;
        this.enlighten = new RollLight();
        this.mode = RollMode.vertical;
        this.speed = 25;
    }

    load(data?: RecursivePartial<IRoll>): void {
        if (!data) {
            return;
        }

        if (data.backColor !== undefined) {
            this.backColor = OptionsColor.create(this.backColor, data.backColor);
        }

        this.darken.load(data.darken);

        if (data.enable !== undefined) {
            this.enable = data.enable;
        }

        this.enlighten.load(data.enlighten);

        if (data.mode !== undefined) {
            this.mode = data.mode;
        }

        if (data.speed !== undefined) {
            this.speed = setRangeValue(data.speed);
        }
    }
}
