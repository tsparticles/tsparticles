import type { IMoveAngle } from "../../../Interfaces/Particles/Move/IMoveAngle";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";

export class MoveAngle implements IMoveAngle, IOptionLoader<IMoveAngle> {
    offset: number;
    value: number;

    constructor() {
        this.offset = 45;
        this.value = 90;
    }

    public load(data?: RecursivePartial<IMoveAngle>): void {
        if (data === undefined) {
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
