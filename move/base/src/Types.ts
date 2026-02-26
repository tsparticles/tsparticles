import type { Container, Engine, GenericInitializer, Particle } from "@tsparticles/engine";
import type { IMovePathGenerator } from "./IMovePathGenerator.js";
import type { IParticleGravity } from "./IParticleGravity.js";
import type { IParticleSpin } from "./IParticleSpin.js";

export type PathGeneratorInitializer = GenericInitializer<IMovePathGenerator>;

export type MoveEngine = Engine & {
  addPathGenerator?: (name: string, generator: PathGeneratorInitializer) => void;

  getPathGenerators?: (container: Container, force?: boolean) => Promise<Map<string, IMovePathGenerator>>;

  initializers: {
    pathGenerators?: Map<string, PathGeneratorInitializer>;
  };

  pathGenerators?: Map<Container, Map<string, IMovePathGenerator>>;
};

export type MoveParticle = Particle & {
  /**
   * Gets particle gravity options
   */
  gravity?: IParticleGravity;

  /**
   * Gets the delay for every path step
   */
  pathDelay?: number;

  /**
   * Gets the particle's path generator
   */
  pathGenerator?: IMovePathGenerator;

  /**
   */
  retina: {
    /**
     */
    spinAcceleration?: number;
  };

  /**
   */
  spin?: IParticleSpin;
};
