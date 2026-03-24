import type { IContainerPlugin } from "./IContainerPlugin.js";
import type { ICoordinates } from "./ICoordinates.js";
import type { IDimension } from "./IDimension.js";
import type { IEffectDrawer } from "./IEffectDrawer.js";
import type { IParticleUpdater } from "./IParticleUpdater.js";
import type { IParticlesOptions } from "../../Options/Interfaces/Particles/IParticlesOptions.js";
import type { IShapeDrawer } from "./IShapeDrawer.js";
import type { Particle } from "../Particle.js";
import type { ParticlesOptions } from "../../Options/Classes/Particles/ParticlesOptions.js";
import type { RecursivePartial } from "../../Types/RecursivePartial.js";

export interface IParticleInitData {
  canvasSize: Readonly<IDimension>;
  dispatchEvent: (type: string, data: unknown) => void;
  effectDrawers: Map<string, IEffectDrawer>;
  group?: string;
  id: number;
  initRetina: (particle: Particle) => void;
  overrideOptions?: RecursivePartial<IParticlesOptions>;
  particleCheckPositionPlugins: IContainerPlugin[];
  particleCreatedPlugins: IContainerPlugin[];
  particleDestroyedPlugins: IContainerPlugin[];
  particlePositionPlugins: IContainerPlugin[];
  particlesOptions: ParticlesOptions;
  pixelRatio: number;
  position?: ICoordinates;
  setLastZIndex: (zIndex: number) => void;
  shapeDrawers: Map<string, IShapeDrawer>;
  updaters: IParticleUpdater[];
  zLayers: number;
}
