import {IParticlesNumber} from "../../../Interfaces/Options/Particles/IParticlesNumber";
import {IDensity} from "../../../Interfaces/Options/Particles/IDensity";
import {Density} from "./Density";
import {Utils} from "../../Utils/Utils";
import {Messages} from "../../Utils/Messages";

export class ParticlesNumber implements IParticlesNumber {
    /**
     * @deprecated the max property is deprecated, please use the new limit
     */
    get max(): number {
        Messages.deprecated("particles.max", "particles.limit");

        return this.limit;
    }

    /**
     * @deprecated the max property is deprecated, please use the new limit
     */
    set max(value: number) {
        Messages.deprecated("particles.max", "particles.limit");

        this.limit = value;
    }

    public density: IDensity;
    public limit: number;
    public value: number;

    constructor() {
        this.density = new Density();
        this.limit = 0;
        this.value = 400;
    }

    public load(data: IParticlesNumber): void {
        if (Utils.hasData(data)) {
            this.density.load(data.density);

            if (Utils.hasData(data.max)) {
                this.max = data.max;
            }

            if (Utils.hasData(data.limit)) {
                this.limit = data.limit;
            }

            if (Utils.hasData(data.value)) {
                this.value = data.value;
            }
        }
    }
}
