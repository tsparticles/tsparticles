import type { Container } from "@tsparticles/engine";

export interface IParticlesState {
    init: boolean;
    library?: Container;
}
