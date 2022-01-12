import type { IAbsorberSizeLimit } from "./IAbsorberSizeLimit";
import type { IValueWithRandom } from "../../../../Options/Interfaces/IValueWithRandom";

export interface IAbsorberSize extends IValueWithRandom {
    limit?: number | IAbsorberSizeLimit;
    density: number;
}
