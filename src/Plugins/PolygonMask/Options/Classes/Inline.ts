import type { IInline } from "../Interfaces/IInline";
import { InlineArrangement } from "../../Enums/InlineArrangement";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";

export class Inline implements IInline {
    public arrangement: InlineArrangement;

    constructor() {
        this.arrangement = InlineArrangement.onePerPoint;
    }

    public load(data?: RecursivePartial<IInline>): void {
        if (data !== undefined) {
            if (data.arrangement !== undefined) {
                this.arrangement = data.arrangement;
            }
        }
    }
}
