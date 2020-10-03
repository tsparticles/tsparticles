import type { ICoordinates } from "../../Core/Interfaces/ICoordinates";
import type { IParticles } from "./Particles/IParticles";
import type { RecursivePartial } from "../../Types";

export interface IManualParticle {
    position: ICoordinates;
    options?: RecursivePartial<IParticles>;
}
