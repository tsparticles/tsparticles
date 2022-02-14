import type { IBackground, IOptionLoader } from "../../Interfaces";
import { OptionsColor } from "../OptionsColor";
import type { RecursivePartial } from "../../../Types";

/**
 * [[include:Options/Background.md]]
 * @category Options
 */
export class Background implements IBackground, IOptionLoader<IBackground> {
    color;
    image;
    position;
    repeat;
    size;
    opacity;

    constructor() {
        this.color = new OptionsColor();
        this.color.value = "";
        this.image = "";
        this.position = "";
        this.repeat = "";
        this.size = "";
        this.opacity = 1;
    }

    load(data?: RecursivePartial<IBackground>): void {
        if (!data) {
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
