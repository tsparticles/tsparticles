import { type IOptionLoader, type RecursivePartial, isNull } from "@tsparticles/engine";
import { DestroyBounds } from "./DestroyBounds.js";
import { DestroyMode } from "../../Enums/DestroyMode.js";
import type { IDestroy } from "../Interfaces/IDestroy.js";
import { Split } from "./Split.js";

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
        if (isNull(data)) {
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
