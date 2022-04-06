import type { IMoveTrail } from "../../../Interfaces/Particles/Move/IMoveTrail";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import { OptionsColor } from "../../OptionsColor";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";

/**
 * @category Options
 */
export class MoveTrail implements IMoveTrail, IOptionLoader<IMoveTrail> {
    enable;
    length;
    fillColor;

    constructor() {
        this.enable = false;
        this.length = 10;
        this.fillColor = new OptionsColor();

        this.fillColor.value = "#000000";
    }

    load(data?: RecursivePartial<IMoveTrail>): void {
        if (!data) {
            return;
        }

        if (data.enable !== undefined) {
            this.enable = data.enable;
        }

        this.fillColor = OptionsColor.create(this.fillColor, data.fillColor);

        if (data.length !== undefined) {
            this.length = data.length;
        }
    }
}
