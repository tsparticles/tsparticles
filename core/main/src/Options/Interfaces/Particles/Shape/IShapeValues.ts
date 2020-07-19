import type { IParticles } from "../IParticles";
import type { RecursivePartial } from "../../../../Types";

export interface IShapeValues {
    close?: boolean;
    fill?: boolean;
    particles?: RecursivePartial<IParticles>;
}
