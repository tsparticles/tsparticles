import type { IMoveAngle, IOptionLoader } from "../../../Interfaces";
import type { RecursivePartial } from "../../../../Types";

/**
 * @category Options
 */
export class MoveAngle implements IMoveAngle, IOptionLoader<IMoveAngle> {
    offset;
    value;

    constructor() {
        this.offset = 0; //45;
        this.value = 90;
    }

    load(data?: RecursivePartial<IMoveAngle>): void {
        if (!data) {
            return;
        }

        if (data.offset !== undefined) {
            this.offset = data.offset;
        }

        if (data.value !== undefined) {
            this.value = data.value;
        }
    }
}
