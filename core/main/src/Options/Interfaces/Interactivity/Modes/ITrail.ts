import type { IOptionLoader } from "../../IOptionLoader";
import type { IParticles } from "../../Particles/IParticles";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";

export interface ITrail extends IOptionLoader<ITrail> {
    delay: number;
    quantity: number;
    particles?: RecursivePartial<IParticles>;
}
