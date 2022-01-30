import type { IParticlesOptions } from "../../Options";
import type { RecursivePartial } from "../../Types";

/**
 * @category Options
 */

export interface IShapeValues {
    close?: boolean;
    fill?: boolean;
    particles?: RecursivePartial<IParticlesOptions>;

    [key: string]: unknown;
}
