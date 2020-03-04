import {IParticlesColor} from "../../../Interfaces/Options/Particles/IParticlesColor";
import {IColor} from "../../../Interfaces/IColor";

export class Color implements IParticlesColor {
    public value: string | IColor | string[];

    constructor() {
        this.value = "#fff";
    }
}
