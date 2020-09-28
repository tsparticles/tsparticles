import type { IMotion } from "../../Interfaces/Motion/IMotion";
import type { IOptionLoader } from "../../Interfaces/IOptionLoader";
import type { RecursivePartial } from "../../../Types";
import { IMotionReduce } from "../../Interfaces/Motion/IMotionReduce";

export class MotionReduce implements IMotionReduce, IOptionLoader<IMotionReduce> {
    public factor;
    public value;

    public constructor() {
        this.factor = 4;
        this.value = false;
    }

    public load(data?: RecursivePartial<IMotionReduce>): void {
        if (!data) {
            return;
        }

        if (data.factor !== undefined) {
            this.factor = data.factor;
        }

        if (data.value !== undefined) {
            this.value = data.value;
        }
    }
}

export class Motion implements IMotion, IOptionLoader<IMotion> {
    public disable;
    public reduce;

    constructor() {
        this.disable = false;
        this.reduce = new MotionReduce();
    }

    public load(data?: RecursivePartial<IMotion>): void {
        if (!data) {
            return;
        }

        if (data.disable !== undefined) {
            this.disable = data.disable;
        }

        this.reduce.load(data.reduce);
    }
}
