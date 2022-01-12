import type { RecursivePartial } from "../../../../Types";
import type { IParticlesOptions } from "../../Particles";

/**
 * @category Options
 */
export interface ITrail {
    delay: number;
    particles?: RecursivePartial<IParticlesOptions>;
    pauseOnStop: boolean;
    quantity: number;
}
