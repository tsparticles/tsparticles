import type { IStroke } from "../../Interfaces/Particles/IStroke";
import type { RecursivePartial } from "../../../Types/RecursivePartial";
import { OptionsColor } from "./OptionsColor";

export class Stroke implements IStroke {
    public color: OptionsColor;
    public width: number;
    public opacity: number;

    constructor() {
        this.color = new OptionsColor();
        this.width = 0;
        this.opacity = 1;

        this.color.value = "#ff0000";
    }

    public load(data?: RecursivePartial<IStroke>): void {
        if (data !== undefined) {
            this.color = OptionsColor.create(this.color, data.color);

            if (data.width !== undefined) {
                this.width = data.width;
            }

            if (data.opacity !== undefined) {
                this.opacity = data.opacity;
            }
        }
    }
}
