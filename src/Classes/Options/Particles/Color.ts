import {IParticlesColor} from "../../../Interfaces/Options/Particles/IParticlesColor";
import {IColor} from "../../../Interfaces/IColor";

export class Color implements IParticlesColor {
    public value: string | IColor | string[];

    constructor() {
        this.value = "#fff";
    }

    public load(data: IParticlesColor): void {
        this.value = data.value;
    }
}
