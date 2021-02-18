import type { IParticles } from "../IParticles";
import type { RecursivePartial } from "../../../../Types";
import { ShapeDataValue } from "../../../../Types";

/**
 * @category Options
 */
export interface IShapeValues {
    close?: boolean;
    fill?: boolean;
    particles?: RecursivePartial<IParticles>;

    [type: string]: unknown;
}
