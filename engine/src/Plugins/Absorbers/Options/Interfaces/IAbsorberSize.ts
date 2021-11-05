import type { IValueWithRandom } from "../../../../Options/Interfaces/IValueWithRandom";
import type { IAbsorberSizeLimit } from "./IAbsorberSizeLimit";

export interface IAbsorberSize extends IValueWithRandom {
    limit?: number | IAbsorberSizeLimit;
    density: number;
}
