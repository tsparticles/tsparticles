import type { Container } from "../Core/Container.js";
import type { IInteractor } from "../Core/Interfaces/IInteractor.js";
import type { IParticleMover } from "../Core/Interfaces/IParticleMover.js";
import type { IParticleUpdater } from "../Core/Interfaces/IParticleUpdater.js";

export type GenericInitializer<T> = (container: Container) => Promise<T>;

/**
 * Alias for interactivity manager initializer function
 */
export type InteractorInitializer = GenericInitializer<IInteractor>;

export type MoverInitializer = GenericInitializer<IParticleMover>;

/**
 * Alias for updater initializer function
 */
export type UpdaterInitializer = GenericInitializer<IParticleUpdater>;

export interface Initializers {
    interactors: Map<string, InteractorInitializer>;
    movers: Map<string, MoverInitializer>;
    updaters: Map<string, UpdaterInitializer>;
}
