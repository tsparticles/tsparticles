import type { IGrabLineLinked } from "../../../Interfaces/Interactivity/Modes/IGrabLineLinked";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import { OptionsColor } from "../../Particles/OptionsColor";

export class GrabLineLinked implements IGrabLineLinked {
    public opacity: number;
    public color?: OptionsColor;

    constructor() {
        this.opacity = 1;
    }

    public load(data?: RecursivePartial<IGrabLineLinked>): void {
        if (data !== undefined) {
            if (data.opacity !== undefined) {
                this.opacity = data.opacity;
            }

            if (data.color !== undefined) {
                this.color = OptionsColor.create(this.color, data.color);
            }
        }
    }
}
