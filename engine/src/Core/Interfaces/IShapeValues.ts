import type { IParticlesOptions } from "../../Options/Interfaces/Particles/IParticlesOptions.js";
import type { RecursivePartial } from "../../Types/RecursivePartial.js";

/**
 */

export interface IShapeValues {
    [key: string]: unknown;

    close?: boolean;
    fill?: boolean;
    particles?: RecursivePartial<IParticlesOptions>;
}
