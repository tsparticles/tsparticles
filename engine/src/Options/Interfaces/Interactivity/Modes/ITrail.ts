import type { IParticlesOptions } from "../../Particles/IParticlesOptions";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";

/**
 * @category Options
 */
export interface ITrail {
    delay: number;
    particles?: RecursivePartial<IParticlesOptions>;
    pauseOnStop: boolean;
    quantity: number;
}
