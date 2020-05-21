import type { IImageShape } from "../../../Interfaces/Particles/Shape/IImageShape";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import { ShapeBase } from "./ShapeBase";

export class ImageShape extends ShapeBase implements IImageShape {
    /**
     *
     * @deprecated this property is obsolete, please use the new replaceColor
     */
    public get replace_color(): boolean {
        return this.replaceColor;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new replaceColor
     * @param value
     */
    public set replace_color(value: boolean) {
        this.replaceColor = value;
    }

    public height: number;
    public replaceColor: boolean;
    public src: string;
    public width: number;

    constructor() {
        super();
        this.height = 100;
        this.replaceColor = false;
        this.src = "";
        this.width = 100;
    }

    public load(data?: RecursivePartial<IImageShape>): void {
        super.load(data);

        if (data !== undefined) {
            if (data.height !== undefined) {
                this.height = data.height;
            }

            const replaceColor = data.replaceColor ?? data.replace_color;

            if (replaceColor !== undefined) {
                this.replaceColor = replaceColor;
            }

            if (data.src !== undefined) {
                this.src = data.src;
            }

            if (data.width !== undefined) {
                this.width = data.width;
            }
        }
    }
}
