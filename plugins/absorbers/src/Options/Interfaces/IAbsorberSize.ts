import type { IAbsorberSizeLimit } from "./IAbsorberSizeLimit";
import type { IValueWithRandom } from "tsparticles-engine";

export interface IAbsorberSize extends IValueWithRandom {
    limit?: number | IAbsorberSizeLimit;
    density: number;
}
