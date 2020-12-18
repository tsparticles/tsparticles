import { IValueWithRandom } from "tsparticles/Options/Interfaces/IValueWithRandom";

export interface IAbsorberSize extends IValueWithRandom {
    limit?: number;
    density: number;
}
