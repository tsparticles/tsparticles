import type { Container } from "../Core/Container.js";
import type { IParticleMover } from "../Core/Interfaces/IParticleMover.js";
import type { IParticleUpdater } from "../Core/Interfaces/IParticleUpdater.js";

export type GenericInitializer<T> = (container: Container) => Promise<T>;

export type MoverInitializer = GenericInitializer<IParticleMover>;

/**
 * Alias for updater initializer function
 */
export type UpdaterInitializer = GenericInitializer<IParticleUpdater>;

export interface Initializers {
  movers: Map<string, MoverInitializer>;
  updaters: Map<string, UpdaterInitializer>;
}
