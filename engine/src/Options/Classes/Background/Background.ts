import type { IBackground } from "../../Interfaces/Background/IBackground";
import type { RecursivePartial } from "../../../Types";
import { OptionsColor } from "../OptionsColor";
import type { IOptionLoader } from "../../Interfaces/IOptionLoader";

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
        if (data === undefined) {
            return;
        }

        this.color = OptionsColor.create(this.color, data.color);

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
