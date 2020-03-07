import {IOpacityAnimation} from "../../../Interfaces/Options/Particles/IOpacityAnimation";

export class OpacityAnimation implements IOpacityAnimation {
    /**
     *
     * @deprecated this property is obsolete, please use the new minimumValue
     */
    public get opacity_min(): number {
        return this.minimumValue;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new minimumValue
     * @param value
     */
    public set opacity_min(value: number) {
        this.minimumValue = value;
    }

    public enable: boolean;
    public minimumValue: number;
    public speed: number;
    public sync: boolean;

    constructor() {
        this.enable = false;
        this.minimumValue = 0;
        this.speed = 2;
        this.sync = false;
    }
}
