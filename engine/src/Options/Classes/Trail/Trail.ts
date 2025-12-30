import { type IOptionLoader } from "../../Interfaces/IOptionLoader.js";
import { type ITrail } from "../../Interfaces/Trail/ITrail.js";
import { type RecursivePartial } from "../../../Types/RecursivePartial.js";
import { TrailFill } from "./TrailFill.js";
import { isNull } from "../../../Utils/TypeUtils.js";

/**
 */
export class Trail implements ITrail, IOptionLoader<ITrail> {
    enable;
    readonly fill;
    length;

    constructor() {
        this.enable = false;
        this.length = 10;
        this.fill = new TrailFill();
    }

    load(data?: RecursivePartial<ITrail>): void {
        if (isNull(data)) {
            return;
        }

        if (data.enable !== undefined) {
            this.enable = data.enable;
        }

        if (data.fill !== undefined) {
            this.fill.load(data.fill);
        }

        if (data.length !== undefined) {
            this.length = data.length;
        }
    }
}
