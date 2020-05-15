import type { ILinksTriangle } from "../../../Interfaces/Particles/Links/ILinksTriangle";
import { OptionsColor } from "../../OptionsColor";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";

export class LinksTriangle implements ILinksTriangle {
    public color?: OptionsColor;
    public enable: boolean;
    public opacity?: number;

    constructor() {
        this.enable = false;
    }

    public load(data?: RecursivePartial<ILinksTriangle>): void {
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
