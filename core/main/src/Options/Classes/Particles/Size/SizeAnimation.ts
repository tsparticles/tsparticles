import type { ISizeAnimation } from "../../../Interfaces/Particles/Size/ISizeAnimation";
import type { RecursivePartial } from "../../../../Types";
import { DestroyType, StartValueType } from "../../../../Enums";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";

/**
 * @category Options
 */
export class SizeAnimation implements ISizeAnimation, IOptionLoader<ISizeAnimation> {
    /**
     * @deprecated use the new Range syntax
     */
    public get size_min(): number | undefined {
        return this.minimumValue;
    }

    /**
     * @deprecated use the new Range syntax
     */
    public set size_min(value: number | undefined) {
        this.minimumValue = value;
    }

    /**
     * @deprecated use the new Range syntax
     */
    public minimumValue?: number;

    public count;
    public destroy: DestroyType | keyof typeof DestroyType;
    public enable;
    public speed;
    public startValue: StartValueType | keyof typeof StartValueType;
    public sync;

    constructor() {
        this.count = 0;
        this.destroy = DestroyType.none;
        this.enable = false;
        this.speed = 5;
        this.startValue = StartValueType.random;
        this.sync = false;
    }

    public load(data?: RecursivePartial<ISizeAnimation>): void {
        if (data === undefined) {
            return;
        }

        if (data.count !== undefined) {
            this.count = data.count;
        }

        if (data.destroy !== undefined) {
            this.destroy = data.destroy;
        }

        if (data.enable !== undefined) {
            this.enable = data.enable;
        }

        const minimumValue = data.minimumValue ?? data.size_min;

        this.minimumValue = minimumValue;

        if (data.speed !== undefined) {
            this.speed = data.speed;
        }

        if (data.startValue !== undefined) {
            this.startValue = data.startValue;
        }

        if (data.sync !== undefined) {
            this.sync = data.sync;
        }
    }
}
