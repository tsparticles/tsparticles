import type { IMoveTrail } from "../../../Interfaces/Particles/Move/IMoveTrail";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import { MoveTrailFill } from "./MoveTrailFill";
import type { OptionsColor } from "../../OptionsColor";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";

/**
 * @category Options
 */
export class MoveTrail implements IMoveTrail, IOptionLoader<IMoveTrail> {
    enable;
    fill;
    length;

    constructor() {
        this.enable = false;
        this.length = 10;
        this.fill = new MoveTrailFill();
    }

    /**
     * @deprecated this property is obsolete, please use the new fill property
     */
    get fillColor(): string | OptionsColor | undefined {
        return this.fill.color;
    }

    /**
     * @deprecated this property is obsolete, please use the new fill property
     */
    set fillColor(value: string | OptionsColor | undefined) {
        this.fill.load({ color: value });
    }

    load(data?: RecursivePartial<IMoveTrail>): void {
        if (!data) {
            return;
        }

        if (data.enable !== undefined) {
            this.enable = data.enable;
        }

        if (data.fill !== undefined || data.fillColor !== undefined) {
            this.fill.load(data.fill || { color: data.fillColor });
        }

        if (data.length !== undefined) {
            this.length = data.length;
        }
    }
}
