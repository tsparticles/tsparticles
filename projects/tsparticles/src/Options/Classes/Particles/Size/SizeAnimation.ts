import type { ISizeAnimation } from "../../../Interfaces/Particles/Size/ISizeAnimation";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import { DestroyType, StartValueType } from "../../../../Enums";

export class SizeAnimation implements ISizeAnimation {
    /**
     *
     * @deprecated this property is obsolete, please use the new minimumValue
     */
    public get size_min(): number {
        return this.minimumValue;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new minimumValue
     * @param value
     */
    public set size_min(value: number) {
        this.minimumValue = value;
    }

    public destroy: DestroyType;
    public enable: boolean;
    public minimumValue: number;
    public speed: number;
    public startValue: StartValueType;
    public sync: boolean;

    constructor() {
        this.destroy = DestroyType.none;
        this.enable = false;
        this.minimumValue = 0;
        this.speed = 5;
        this.startValue = StartValueType.max;
        this.sync = false;
    }

    public load(data?: RecursivePartial<ISizeAnimation>): void {
        if (data === undefined) {
            return;
        }

        if (data.destroy !== undefined) {
            this.destroy = data.destroy;
        }

        if (data.enable !== undefined) {
            this.enable = data.enable;
        }

        const minimumValue = data.minimumValue ?? data.size_min;

        if (minimumValue !== undefined) {
            this.minimumValue = minimumValue;
        }

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
