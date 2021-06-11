import type { RecursivePartial } from "../../Types";
import type { IParticles } from "../../Options/Interfaces/Particles/IParticles";

/**
 * @category Interfaces
 */

export interface IShapeValues {
    close?: boolean;
    fill?: boolean;
    particles?: RecursivePartial<IParticles>;

    [type: string]: unknown;
}
