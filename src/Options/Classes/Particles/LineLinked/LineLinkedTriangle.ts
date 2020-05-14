import type { ILineLinkedTriangle } from "../../../Interfaces/Particles/LineLinked/ILineLinkedTriangle";
import { OptionsColor } from "../../OptionsColor";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";

export class LineLinkedTriangle implements ILineLinkedTriangle {
    public color?: OptionsColor;
    public enable: boolean;
    public opacity?: number;

    constructor() {
        this.enable = false;
    }

    public load(data?: RecursivePartial<ILineLinkedTriangle>): void {
        if (data !== undefined) {
            if (data.color !== undefined) {
                this.color = OptionsColor.create(this.color, data.color);
            }

            if (data.enable !== undefined) {
                this.enable = data.enable;
            }

            if (data.opacity !== undefined) {
                this.opacity = data.opacity;
            }
        }
    }
}
