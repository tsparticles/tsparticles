import type { IStroke } from "../../../Interfaces/Options/Particles/IStroke";
import type { RecursivePartial } from "../../../Types/RecursivePartial";
import type { IOptionsColor } from "../../../Interfaces/Options/Particles/IOptionsColor";
import { OptionsColor } from "./OptionsColor";

export class Stroke implements IStroke {
    public color: IOptionsColor;
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
            this.color.load(typeof data.color === "string" ? { value: data.color } : data.color);

            if (data.width !== undefined) {
                this.width = data.width;
            }

            if (data.opacity !== undefined) {
                this.opacity = data.opacity;
            }
        }
    }
}
