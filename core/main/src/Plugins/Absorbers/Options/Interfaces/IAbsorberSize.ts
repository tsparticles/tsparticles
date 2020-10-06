import { IValueWithRandom } from "../../../../Options/Interfaces/IValueWithRandom";

export interface IAbsorberSize extends IValueWithRandom {
    limit?: number;
    density: number;
}
