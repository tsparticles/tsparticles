import type {
  Container,
  IHsl,
  IParticleRetinaProps,
  IParticlesOptions,
  Particle,
  ParticlesOptions,
  Retina,
} from "@tsparticles/engine";
import type { IOrbit } from "./Options/Interfaces/IOrbit.js";
import type { Orbit } from "./Options/Classes/Orbit.js";

/** Orbit particles options interface */
export type IOrbitParticlesOptions = IParticlesOptions & {
  /** Orbit options */
  orbit?: IOrbit;
};

/** Orbit particles options */
export type OrbitParticlesOptions = ParticlesOptions & {
  /** Orbit options */
  orbit?: Orbit;
};

/** Orbit retina extension type */
export type OrbitRetina = Retina & {
  /** Orbit radius */
  orbitRadius?: number;
};

/** Orbit container extension type */
export type OrbitContainer = Container & {
  /** Orbit retina */
  retina: OrbitRetina;
};

/** Orbit particle extension type */
export type OrbitParticle = Particle & {
  /** Orbit particles options */
  options: OrbitParticlesOptions;
  /** Orbit animation speed */
  orbitAnimationSpeed?: number;
  /** Orbit color */
  orbitColor?: IHsl;
  /** Orbit opacity */
  orbitOpacity?: number;
  /** Orbit rotation */
  orbitRotation?: number;
  /** Orbit width */
  orbitWidth?: number;
  /** Orbit retina properties */
  retina: IParticleRetinaProps & {
    /** Orbit radius */
    orbitRadius?: number;
  };
};
