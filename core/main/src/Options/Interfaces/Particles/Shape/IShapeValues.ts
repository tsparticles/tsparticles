import type { IParticles } from "../IParticles";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";

/**
 * @category Options
 */
export interface IShapeValues {
    close?: boolean;
    fill?: boolean;
    particles?: RecursivePartial<IParticles>;
}
