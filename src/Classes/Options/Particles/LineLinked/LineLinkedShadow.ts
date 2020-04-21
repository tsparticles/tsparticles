import type { ILineLinkedShadow } from "../../../../Interfaces/Options/Particles/LineLinked/ILineLinkedShadow";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import type { IOptionsColor } from "../../../../Interfaces/Options/Particles/IOptionsColor";
import { OptionsColor } from "../OptionsColor";

export class LineLinkedShadow implements ILineLinkedShadow {
    public blur: number;
    public color: IOptionsColor;
    public enable: boolean;

    constructor() {
        this.blur = 5;
        this.color = new OptionsColor();
        this.enable = false;

        this.color.value = "lime";
    }

    public load(data?: RecursivePartial<ILineLinkedShadow>): void {
        if (data !== undefined) {
            if (data.blur !== undefined) {
                this.blur = data.blur;
            }

            this.color.load(typeof data.color === "string" ? { value: data.color } : data.color);

            if (data.enable !== undefined) {
                this.enable = data.enable;
            }
        }
    }
}
