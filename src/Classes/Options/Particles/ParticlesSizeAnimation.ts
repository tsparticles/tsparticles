import {ISizeAnimation} from "../../../Interfaces/Options/Particles/ISizeAnimation";
import {Messages} from "../../Utils/Messages";
import {Utils} from "../../Utils/Utils";

export class ParticlesSizeAnimation implements ISizeAnimation {
    /**
     *
     * @deprecated this property is obsolete, please use the new minimumValue
     */
    public get size_min(): number {
        Messages.deprecated("particles.size.animation.size_min", "particles.size.animation.minimumValue");

        return this.minimumValue;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new minimumValue
     * @param value
     */
    public set size_min(value: number) {
        Messages.deprecated("particles.size.animation.size_min", "particles.size.animation.minimumValue");

        this.minimumValue = value;
    }

    public enable: boolean;
    public minimumValue: number;
    public speed: number;
    public sync: boolean;

    constructor() {
        this.enable = false;
        this.minimumValue = 0;
        this.speed = 20;
        this.sync = false;
    }

    public load(data: ISizeAnimation): void {
        if (Utils.hasData(data)) {
            if (Utils.hasData(data.enable)) {
                this.enable = data.enable;
            }

            const minValue = data.minimumValue ?? data.size_min;

            if (Utils.hasData(minValue)) {
                this.minimumValue = minValue;
            }

            if (Utils.hasData(data.speed)) {
                this.speed = data.speed;
            }

            if (Utils.hasData(data.sync)) {
                this.sync = data.sync;
            }
        }
    }
}
