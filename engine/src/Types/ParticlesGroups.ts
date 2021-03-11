import type { IParticles } from "../Options/Interfaces/Particles/IParticles";

/**
 * @category Types
 * [[include:Options/Particles/Group.md]]
 */
export type ParticlesGroups = {
    [name: string]: IParticles;
};
