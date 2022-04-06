import type { IParticlesOptions } from "../IParticlesOptions";
import type { IValueWithRandom } from "../../IValueWithRandom";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";

export interface ISplit {
    count: number;
    factor: IValueWithRandom;
    particles?: RecursivePartial<IParticlesOptions>;
    rate: IValueWithRandom;
    sizeOffset: boolean;
}
