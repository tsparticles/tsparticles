import type { IParticlesOptions } from "../IParticlesOptions";
import type { IValueWithRandom } from "../../IValueWithRandom";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple";

export interface ISplit {
    count: number;
    factor: IValueWithRandom;
    particles?: SingleOrMultiple<RecursivePartial<IParticlesOptions>>;
    rate: IValueWithRandom;
    sizeOffset: boolean;
}
