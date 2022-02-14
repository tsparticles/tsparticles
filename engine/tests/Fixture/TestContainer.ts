import { Container } from "../../src";
import type { IOptions } from "../../src";
import { Options } from "../../src";
import { RecursivePartial } from "../../src";
import { tsParticles } from "../../src";

declare global {
    interface Window {
        SVGPathSeg: unknown;
    }
}

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
        this.container = new Container(tsParticles, this.id, this.options);
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

        this.container = new Container(tsParticles, this.id, this.options);
        this.container.actualOptions = new Options(tsParticles);
        this.container.actualOptions.load(this.container.options);
        this.container.init();
    }
}
