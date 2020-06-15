import { tsParticles } from "../../src";
import { Container } from "../../src/Core/Container";
import type { IOptions } from "../../src/Options/Interfaces/IOptions";
import { RecursivePartial } from "../../src/Types/RecursivePartial";

export class TestContainer {
    private readonly id: string;
    private params: RecursivePartial<IOptions> | undefined;
    public container: Container;

    constructor(params?: RecursivePartial<IOptions>) {
        tsParticles.init();

        const defaultOptions: RecursivePartial<IOptions> = { particles: { size: { value: 0 } } };

        this.id = "test-container";

        this.params = params ?? defaultOptions; // This keeps new Particle from offsetting position by 3
        this.container = new Container(this.id, this.params);
        this.container.retina.init();
    }

    /**
     * Reset the container. If [[params]] is provided, then the new spatial grid will be
     * initialized with this [[params]]. Otherwise the last-used [[params]] will be used.
     *
     * @param params
     */
    public reset(params?: RecursivePartial<IOptions>): void {
        if (params !== undefined) {
            this.params = params;
        }
        this.container = new Container(this.id, this.params);
        this.container.retina.init();
    }
}
