import { IOffsetValue } from "../Interfaces/IOffsetValue";
import { IOptionLoader } from "../Interfaces/IOptionLoader";
import { RecursivePartial } from "../../Types";

export class OffsetValue implements IOffsetValue, IOptionLoader<IOffsetValue> {
    public max: number;
    public min: number;

    constructor() {
        this.max = 0;
        this.min = 0;
    }

    public load(data?: RecursivePartial<IOffsetValue>): void {
        if (!data) {
            return;
        }

        if (data.max !== undefined) {
            this.max = data.max;
        }

        if (data.min !== undefined) {
            this.min = data.min;
        }
    }
}
