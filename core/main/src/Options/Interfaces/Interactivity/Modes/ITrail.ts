import type { IParticles } from "../../Particles/IParticles";
import type { RecursivePartial } from "../../../../Types";

/**
 * @category Options
 */
export interface ITrail {
    delay: number;
    particles?: RecursivePartial<IParticles>;
    pauseOnStop: boolean;
    quantity: number;
}
