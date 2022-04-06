import type { IParticlesOptions } from "../Options/Interfaces/Particles/IParticlesOptions";

/**
 * @category Types
 * [[include:Options/Particles/Group.md]]
 */
export type ParticlesGroups = {
    [name: string]: IParticlesOptions;
};
