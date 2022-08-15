import type { IOptionLoader, RecursivePartial } from "tsparticles-engine";
import { DestroyBounds } from "./DestroyBounds";
import { DestroyMode } from "../../Enums/DestroyMode";
import type { IDestroy } from "../Interfaces/IDestroy";
import { Split } from "./Split";

export class Destroy implements IDestroy, IOptionLoader<IDestroy> {
    bounds: DestroyBounds;
    mode: DestroyMode | keyof typeof DestroyMode;
    split: Split;

    constructor() {
        this.bounds = new DestroyBounds();
        this.mode = DestroyMode.none;
        this.split = new Split();
    }

    load(data?: RecursivePartial<IDestroy>): void {
        if (!data) {
            return;
        }

        if (data.mode) {
            this.mode = data.mode;
        }

        if (data.bounds) {
            this.bounds.load(data.bounds);
        }

        this.split.load(data.split);
    }
}
