import { tsParticles } from "../../src";
import { Container } from "../../src/Core/Container";
import { Options } from "../../src/Options/Classes/Options";
import type { IOptions } from "../../src/Options/Interfaces/IOptions";
import { RecursivePartial } from "../../src/Types";

export class TestContainer {
    private readonly id: string;
    private options: RecursivePartial<IOptions> | undefined;
    container: Container;

    constructor(options?: RecursivePartial<IOptions>) {
        window.SVGPathSeg = {} as any;
        tsParticles.init();

        const defaultOptions: RecursivePartial<IOptions> = { particles: { size: { value: 0 } } };

        this.id = "test-container";

        this.options = options ?? defaultOptions; // This keeps new Particle from offsetting position by 3
        this.container = new Container(this.id, this.options);
        this.container.init();
    }

    /**
     * Reset the container. If [[options]] is provided, then the new spatial grid will be
     * initialized with this [[options]]. Otherwise the last-used [[options]] will be used.
     *
     * @param options
     */
    reset(options?: RecursivePartial<IOptions>): void {
        if (options !== undefined) {
            this.options = options;
        }

        this.container = new Container(this.id, this.options);
        this.container.actualOptions = new Options();
        this.container.actualOptions.load(this.container.options);
        this.container.init();
    }
}
