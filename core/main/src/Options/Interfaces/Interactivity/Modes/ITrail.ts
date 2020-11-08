import type { IParticles } from "../../Particles/IParticles";
import type { RecursivePartial } from "../../../../Types";

/**
 * @category Options
 */
export interface ITrail {
    delay: number;
    quantity: number;
    particles?: RecursivePartial<IParticles>;
    pauseOnStop: boolean;
}
