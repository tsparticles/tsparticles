import type { IParticlesOptions, Particle, ParticlesOptions } from "@tsparticles/engine";
import type { Collisions } from "./Options/Classes/Collisions.js";
import type { ICollisions } from "./Options/Interfaces/ICollisions.js";

export type CollisionParticle = Particle & {
    options: ParticlesCollisionOptions;
};

export type IParticlesCollisionOptions = IParticlesOptions & {
    collisions?: ICollisions;
};

export type ParticlesCollisionOptions = ParticlesOptions & {
    collisions?: Collisions;
};
