import type { IParticlesOptions } from "../../Options/Interfaces/Particles/IParticlesOptions";
import type { RecursivePartial } from "../../Types/RecursivePartial";

/**
 * @category Options
 */

export interface IShapeValues {
    close?: boolean;
    fill?: boolean;
    particles?: RecursivePartial<IParticlesOptions>;

    [key: string]: unknown;
}
