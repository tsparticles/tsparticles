import type { Container } from "../Core/Container.js";
import type { IEffectDrawer } from "../Core/Interfaces/IEffectDrawer.js";
import type { IParticleMover } from "../Core/Interfaces/IParticleMover.js";
import type { IParticleUpdater } from "../Core/Interfaces/IParticleUpdater.js";
import type { IShapeDrawer } from "../Core/Interfaces/IShapeDrawer.js";

export type GenericInitializer<T> = (container: Container) => Promise<T>;
export type EffectInitializer = GenericInitializer<IEffectDrawer>;
export type MoverInitializer = GenericInitializer<IParticleMover>;
export type ShapeInitializer = GenericInitializer<IShapeDrawer>;
export type UpdaterInitializer = GenericInitializer<IParticleUpdater>;

export interface Initializers {
  effects: Map<string, EffectInitializer>;
  movers: Map<string, MoverInitializer>;
  shapes: Map<string, ShapeInitializer>;
  updaters: Map<string, UpdaterInitializer>;
}
