import type { IBackground } from "../../Interfaces/Background/IBackground";
import type { RecursivePartial } from "../../../Types/RecursivePartial";
import { OptionsColor } from "../OptionsColor";
import type { IOptionLoader } from "../../Interfaces/IOptionLoader";

export class Background implements IBackground, IOptionLoader<IBackground> {
    public color: OptionsColor;
    public image: string;
    public position: string;
    public repeat: string;
    public size: string;
    public opacity: number;

    constructor() {
        this.color = new OptionsColor();
        this.color.value = "";
        this.image = "";
        this.position = "";
        this.repeat = "";
        this.size = "";
        this.opacity = 1;
    }

    public load(data?: RecursivePartial<IBackground>): void {
        if (data === undefined) {
            return;
        }

        if (data.color !== undefined) {
            this.color = OptionsColor.create(this.color, data.color);
        }

        if (data.image !== undefined) {
            this.image = data.image;
        }

        if (data.position !== undefined) {
            this.position = data.position;
        }

        if (data.repeat !== undefined) {
            this.repeat = data.repeat;
        }

        if (data.size !== undefined) {
            this.size = data.size;
        }

        if (data.opacity !== undefined) {
            this.opacity = data.opacity;
        }
    }
}
