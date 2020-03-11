import {IDensity} from "./IDensity";
import {IOptionLoader} from "../IOptionLoader";

export interface IParticlesNumber extends IOptionLoader<IParticlesNumber> {
    density: IDensity;
    limit: number;
    value: number;
}
