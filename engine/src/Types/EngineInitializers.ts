import type { Container } from "../Core/Container.js";
import type { IEffectDrawer } from "../Core/Interfaces/IEffectDrawer.js";
import type { IParticleUpdater } from "../Core/Interfaces/IParticleUpdater.js";
import type { IShapeDrawer } from "../Core/Interfaces/IShapeDrawer.js";

/** Generic initializer function type that takes a container and returns a promise */
export type GenericInitializer<T> = (container: Container) => Promise<T>;
/** Effect drawer initializer type */
export type EffectInitializer = GenericInitializer<IEffectDrawer>;
/** Shape drawer initializer type */
export type ShapeInitializer = GenericInitializer<IShapeDrawer>;
/** Particle updater initializer type */
export type UpdaterInitializer = GenericInitializer<IParticleUpdater>;

/** Collection of initializers for effects, shapes, and updaters */
export interface Initializers {
  /** Effect drawer initializers mapped by name */
  effects: Map<string, EffectInitializer>;
  /** Shape drawer initializers mapped by name */
  shapes: Map<string, ShapeInitializer>;
  /** Particle updater initializers mapped by name */
  updaters: Map<string, UpdaterInitializer>;
}
