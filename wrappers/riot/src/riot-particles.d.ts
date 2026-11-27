import type { Engine } from "@tsparticles/engine";
import type { RiotComponent, RiotComponentWrapper } from "riot";

export type ParticlesPluginRegistrar = (engine: Engine) => Promise<void> | void;

export declare function initParticlesEngine(engine: Engine, init?: ParticlesPluginRegistrar): Promise<void>;

export declare function isParticlesEngineInitialized(engine: Engine): boolean;

export declare function waitForParticlesEngineInitialization(engine: Engine): Promise<void>;

declare const riotParticles: RiotComponentWrapper<RiotComponent>;

export default riotParticles;
