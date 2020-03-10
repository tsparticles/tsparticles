import {IParticlesNumber} from "../../../Interfaces/Options/Particles/IParticlesNumber";
import {IDensity} from "../../../Interfaces/Options/Particles/IDensity";
import {Density} from "./Density";

export class ParticlesNumber implements IParticlesNumber {
    public density: IDensity;
    public limit: number;
    public value: number;

    constructor() {
        this.density = new Density();
        this.limit = 0;
        this.value = 400;
    }
}
