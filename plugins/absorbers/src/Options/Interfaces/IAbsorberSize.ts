import type { IValueWithRandom } from "tsparticles-engine";
import type { IAbsorberSizeLimit } from "./IAbsorberSizeLimit";

export interface IAbsorberSize extends IValueWithRandom {
    limit?: number | IAbsorberSizeLimit;
    density: number;
}
