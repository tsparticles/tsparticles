import type { IMoveTrail } from "../../../Interfaces/Particles/Move/IMoveTrail";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import { MoveTrailFill } from "./MoveTrailFill";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";

/**
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

    load(data?: RecursivePartial<IMoveTrail>): void {
        if (!data) {
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
