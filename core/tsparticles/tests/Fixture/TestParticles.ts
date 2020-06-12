import { Container } from "../../src/Core/Container";
import { Particles } from "../../src/Core/Particles";

export class TestParticles {
    private container: Container;
    public particles: Particles;

    constructor(container: Container) {
        this.container = container;
        this.particles = new Particles(this.container);
    }

    /**
     * If [[container]] is provided, then the new particle will be initialized with
     * this [[container]]. Otherwise the last-used [[container]] will be used.
     *
     * [[position]] will be used verbatim, even if it is not provided. The last-used
     * [[position]] will not be used.
     *
     * @param container
     */
    public reset(container?: Container): void {
        if (container !== undefined) {
            this.container = container;
        }

        this.particles = new Particles(this.container);
    }
}
