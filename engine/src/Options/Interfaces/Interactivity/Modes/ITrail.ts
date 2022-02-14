import type { IParticlesOptions } from "../../Particles";
import type { RecursivePartial } from "../../../../Types";

/**
 * @category Options
 */
export interface ITrail {
    delay: number;
    particles?: RecursivePartial<IParticlesOptions>;
    pauseOnStop: boolean;
    quantity: number;
}
