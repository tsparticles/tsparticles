import type { Engine, GenericInitializer, Particle, PluginManager } from "@tsparticles/engine";
import type { IMovePathGenerator } from "./IMovePathGenerator.js";
import type { IParticleGravity } from "./IParticleGravity.js";
import type { IParticleSpin } from "./IParticleSpin.js";

/** Path generator initializer type */
export type PathGeneratorInitializer = GenericInitializer<IMovePathGenerator>;

/** Move plugin manager */
export type MovePluginManager = PluginManager & {
  /** Adds a path generator by name */
  addPathGenerator?: (name: string, generator: PathGeneratorInitializer) => void;

  /** The path generator initializers */
  initializers: {
    /** Map of path generator initializers */
    pathGenerators?: Map<string, PathGeneratorInitializer>;
  };
};

/** Engine with move plugin manager */
export type MoveEngine = Engine & {
  /** The move plugin manager */
  pluginManager: MovePluginManager;
};

export type MoveParticle = Particle & {
  /**
   * Gets particle gravity options
   */
  gravity?: IParticleGravity;

  /**
   * Gets particle movement speed decay
   */
  moveDecay?: number;

  /**
   * Gets the delay for every path step
   */
  pathDelay?: number;

  /**
   * Gets the particle's path generator
   */
  pathGenerator?: IMovePathGenerator;

  /** The retina properties for this particle */
  retina: {
    /** The spin acceleration value */
    spinAcceleration?: number;
  };

  /** The particle spin animation data */
  spin?: IParticleSpin;
};
