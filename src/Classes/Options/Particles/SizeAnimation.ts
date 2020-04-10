import type {ISizeAnimation} from "../../../Interfaces/Options/Particles/ISizeAnimation";
import type {RecursivePartial} from "../../../Types/RecursivePartial";

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

    public enable: boolean;
    public minimumValue: number;
    public speed: number;
    public sync: boolean;

    constructor() {
        this.enable = false;
        this.minimumValue = 0;
        this.speed = 5;
        this.sync = false;
    }

    public load(data?: RecursivePartial<ISizeAnimation>): void {
        if (data !== undefined) {
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

            if (data.sync !== undefined) {
                this.sync = data.sync;
            }
        }
    }
}
