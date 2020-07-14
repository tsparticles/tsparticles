import { tsParticles } from "../../src";
import { Container } from "../../src/Core/Container";
import type { IOptions } from "../../src/Options/Interfaces/IOptions";
import { RecursivePartial } from "../../src/Types/RecursivePartial";

export class TestContainer {
    private readonly id: string;
    private options: RecursivePartial<IOptions> | undefined;
    public container: Container;

    constructor(options?: RecursivePartial<IOptions>) {
        tsParticles.init();

        const defaultOptions: RecursivePartial<IOptions> = { particles: { size: { value: 0 } } };

        this.id = "test-container";

        this.options = options ?? defaultOptions; // This keeps new Particle from offsetting position by 3
        this.container = new Container(this.id, this.options);
        this.container.retina.init();
    }

    /**
     * Reset the container. If [[options]] is provided, then the new spatial grid will be
     * initialized with this [[options]]. Otherwise the last-used [[options]] will be used.
     *
     * @param options
     */
    public reset(options?: RecursivePartial<IOptions>): void {
        if (options !== undefined) {
            this.options = options;
        }
        this.container = new Container(this.id, this.options);
        this.container.retina.init();
    }
}
