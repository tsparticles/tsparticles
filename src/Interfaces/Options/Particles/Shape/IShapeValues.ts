import type { IParticles } from "../IParticles";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";

export interface IShapeValues {
    close?: boolean;
    fill?: boolean;
    particles?: RecursivePartial<IParticles>;
}
