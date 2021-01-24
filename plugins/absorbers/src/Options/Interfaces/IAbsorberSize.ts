import { IValueWithRandom } from "tsparticles-core/Options/Interfaces/IValueWithRandom";

export interface IAbsorberSize extends IValueWithRandom {
    limit?: number;
    density: number;
}
