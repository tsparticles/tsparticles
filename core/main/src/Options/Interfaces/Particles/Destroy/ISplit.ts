import type { IValueWithRandom } from "../../IValueWithRandom";
import type { RecursivePartial } from "../../../../Types";
import type { IParticles } from "../IParticles";

export interface ISplit {
    count: number;
    factor: IValueWithRandom;
    particles?: RecursivePartial<IParticles>;
    rate: IValueWithRandom;
}
