import type { Container, IOptions, Options } from "@tsparticles/engine";
import type { IManualParticle } from "./Options/Interfaces/IManualParticle.js";
import type { ManualParticle } from "./Options/Classes/ManualParticle.js";

export type IManualParticlesOptions = IOptions & {
  manualParticles?: IManualParticle[];
};

export type ManualParticlesOptions = Options & {
  manualParticles?: ManualParticle[];
};

export type ManualParticlesContainer = Container & {
  actualOptions: ManualParticlesOptions;
};
