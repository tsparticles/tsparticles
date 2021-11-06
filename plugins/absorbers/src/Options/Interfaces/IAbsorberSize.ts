import { IValueWithRandom } from "tsparticles-engine/Options/Interfaces/IValueWithRandom";
import type { IAbsorberSizeLimit } from "./IAbsorberSizeLimit";

export interface IAbsorberSize extends IValueWithRandom {
    limit?: number | IAbsorberSizeLimit;
    density: number;
}
