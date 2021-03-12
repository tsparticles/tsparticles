import { IDestroy } from "../../../Interfaces/Particles/Destroy/IDestroy";
import { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import { DestroyMode } from "../../../../Enums/Modes/DestroyMode";
import { RecursivePartial } from "../../../../Types";
import { Split } from "./Split";

export class Destroy implements IDestroy, IOptionLoader<IDestroy> {
    public mode: DestroyMode;
    public split: Split;

    constructor() {
        this.mode = DestroyMode.none;
        this.split = new Split();
    }

    public load(data?: RecursivePartial<IDestroy>): void {
        if (!data) {
            return;
        }

        if (data.mode !== undefined) {
            this.mode = data.mode;
        }

        this.split.load(data.split);
    }
}
