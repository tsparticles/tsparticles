import type { IParticlesOptions } from "../../Options/Interfaces/Particles/IParticlesOptions";
import type { RecursivePartial } from "../../Types/RecursivePartial";

/**
 
 */

export interface IShapeValues {
    [key: string]: unknown;

    close?: boolean;
    fill?: boolean;
    particles?: RecursivePartial<IParticlesOptions>;
}
