import type {
  IInteractivityParticlesOptions,
  InteractivityParticle,
  InteractivityParticlesOptions,
} from "@tsparticles/plugin-interactivity";
import type { Collisions } from "./Options/Classes/Collisions.js";
import type { ICollisions } from "./Options/Interfaces/ICollisions.js";

export type CollisionParticle = InteractivityParticle & {
  options: ParticlesCollisionOptions;
};

export type IParticlesCollisionOptions = IInteractivityParticlesOptions & {
  collisions?: ICollisions;
};

export type ParticlesCollisionOptions = InteractivityParticlesOptions & {
  collisions?: Collisions;
};
