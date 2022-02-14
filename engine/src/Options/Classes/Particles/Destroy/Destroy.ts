import type { IDestroy, IOptionLoader } from "../../../Interfaces";
import { DestroyMode } from "../../../../Enums";
import type { RecursivePartial } from "../../../../Types";
import { Split } from "./Split";

export class Destroy implements IDestroy, IOptionLoader<IDestroy> {
    mode: DestroyMode;
    split: Split;

    constructor() {
        this.mode = DestroyMode.none;
        this.split = new Split();
    }

    load(data?: RecursivePartial<IDestroy>): void {
        if (!data) {
            return;
        }

        if (data.mode !== undefined) {
            this.mode = data.mode;
        }

        this.split.load(data.split);
    }
}
