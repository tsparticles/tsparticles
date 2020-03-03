import {Container} from "../Container";
import {Particle} from "../Particle";
import {Linker} from "./Linker";
import {Attracter} from "./Attracter";
import {Bouncer} from "./Bouncer";

export class InteractionManager {
    private readonly container: Container;
    private readonly particle: Particle;
    private readonly linker: Linker;
    private readonly attracter: Attracter;
    private readonly bouncer: Bouncer;

    constructor(container: Container, particle: Particle) {
        this.container = container;
        this.particle = particle;
        this.linker = new Linker(container, particle);
        this.attracter = new Attracter(container, particle);
        this.bouncer = new Bouncer(container, particle);
    }

    public interact(p2: Particle): void {
        const container = this.container;
        const options = container.options;

        /* link particles */
        if (options.particles.line_linked.enable) {
            this.link(p2);
        }

        /* attract particles */
        if (options.particles.move.attract.enable) {
            this.attract(p2);
        }

        /* bounce particles */
        if (options.particles.move.bounce) {
            this.bounce(p2);
        }
    }

    private link(p2: Particle): void {
        this.linker.link(p2);
    }

    private attract(p2: Particle): void {
        this.attracter.attract(p2);
    }

    private bounce(p2: Particle): void {
        this.bouncer.bounce(p2);
    }
}
