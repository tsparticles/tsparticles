import { IValueWithRandom } from "tsparticles-engine/Options/Interfaces/IValueWithRandom";

export interface IAbsorberSize extends IValueWithRandom {
    limit?: number;
    density: number;
}
