import type { IParticles } from "../../Particles/IParticles";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";

export interface ITrail {
    delay: number;
    quantity: number;
    particles?: RecursivePartial<IParticles>;
}
