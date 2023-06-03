import type { Container } from "../../src/Core/Container";
import type { Particles } from "../../src/Core/Particles";

export class TestParticles {
    particles: Particles;

    private container: Container;

    constructor(container: Container) {
        this.container = container;
        this.particles = this.container.particles;
    }

    /**
     * If {@link container} is provided, then the new particle will be initialized with
     * this {@link container}. Otherwise the last-used {@link container} will be used.
     *
     * {@link position} will be used verbatim, even if it is not provided. The last-used
     * {@link position} will not be used.
     *
     * @param container
     */
    reset(container?: Container): void {
        if (container !== undefined) {
            this.container = container;
        }

        this.particles = this.container.particles;
    }
}
