import {IParticlesNumber} from "../../../Interfaces/Options/Particles/IParticlesNumber";
import {IDensity} from "../../../Interfaces/Options/Particles/IDensity";
import {Density} from "./Density";
import {Utils} from "../../Utils/Utils";

export class ParticlesNumber implements IParticlesNumber {
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

            if (Utils.hasData(data.limit)) {
                this.limit = data.limit;
            }

            if (Utils.hasData(data.value)) {
                this.value = data.value;
            }
        }
    }
}
