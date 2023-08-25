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

export type IOrbitParticlesOptions = IParticlesOptions & {
    orbit?: IOrbit;
};

export type OrbitParticlesOptions = ParticlesOptions & {
    orbit?: Orbit;
};

export type OrbitRetina = Retina & {
    orbitRadius?: number;
};

export type OrbitContainer = Container & {
    retina: OrbitRetina;
};

export type OrbitParticle = Particle & {
    options: OrbitParticlesOptions;
    orbitAnimationSpeed?: number;
    orbitColor?: IHsl;
    orbitOpacity?: number;
    orbitRotation?: number;
    orbitWidth?: number;
    retina: IParticleRetinaProps & {
        orbitRadius?: number;
    };
};
