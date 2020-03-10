import {IParticlesColor} from "../../../Interfaces/Options/Particles/IParticlesColor";
import {IColor} from "../../../Interfaces/IColor";
import {Utils} from "../../Utils/Utils";

export class Color implements IParticlesColor {
    public value: string | IColor | string[];

    constructor() {
        this.value = "#fff";
    }

    public load(data: IParticlesColor): void {
        if (Utils.hasData(data)) {
            if (Utils.hasData(data.value)) {
                this.value = data.value;
            }
        }
    }
}
