import type { Container } from "../Core/Container.js";
import type { Engine } from "../Core/Engine.js";
import type { IEffectDrawer } from "../Core/Interfaces/IEffectDrawer.js";
import type { IParticleUpdater } from "../Core/Interfaces/IParticleUpdater.js";
import type { IShapeDrawer } from "../Core/Interfaces/IShapeDrawer.js";

export type ContainerScopedMap<T> = Map<symbol, T>;
export type GenericInitializer<T> = (container: Container) => Promise<T>;
export type EffectInitializer = GenericInitializer<IEffectDrawer>;
export type ShapeInitializer = GenericInitializer<IShapeDrawer>;
export type UpdaterInitializer = GenericInitializer<IParticleUpdater>;

export type AsyncLoadPluginFunction = (engine: Engine) => Promise<void>;
export type SyncLoadPluginFunction = (engine: Engine) => void;
export type AsyncLoadPluginNoEngine = () => Promise<void>;
export type SyncLoadPluginNoEngine = () => void;
export type LoadPluginFunction =
  | AsyncLoadPluginFunction
  | SyncLoadPluginFunction
  | AsyncLoadPluginNoEngine
  | SyncLoadPluginNoEngine;

export interface Initializers {
  effects: Map<string, EffectInitializer>;
  shapes: Map<string, ShapeInitializer>;
  updaters: Map<string, UpdaterInitializer>;
}
