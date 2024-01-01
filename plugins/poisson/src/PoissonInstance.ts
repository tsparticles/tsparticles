import { type Engine, type IContainerPlugin, type ICoordinates, getRangeMax } from "@tsparticles/engine";
import type { PoissonContainer } from "./types.js";
import { PoissonDisc } from "./PoissonDisc.js";

/**
 * Poisson Disc manager
 */
export class PoissonInstance implements IContainerPlugin {
    poissonDisc?: PoissonDisc;
    redrawTimeout?: number;

    private readonly _container: PoissonContainer;
    private _currentIndex: number;
    private readonly _engine: Engine;

    constructor(container: PoissonContainer, engine: Engine) {
        this._container = container;
        this._engine = engine;
        this._currentIndex = 0;
    }

    async init(): Promise<void> {
        await this._initData();
    }

    particlePosition(position?: ICoordinates): ICoordinates | undefined {
        const container = this._container,
            options = container.actualOptions.poisson;

        if (!this.poissonDisc || !(options?.enable ?? false) || this._currentIndex >= this.poissonDisc.points.length) {
            return;
        }

        return position ?? this.poissonDisc?.points[this._currentIndex++]?.position;
    }

    resize(): void {
        const container = this._container,
            options = container.actualOptions.poisson;

        if (!(options?.enable ?? false)) {
            return;
        }

        if (this.redrawTimeout) {
            clearTimeout(this.redrawTimeout);
        }

        const timeout = 250;

        this.redrawTimeout = window.setTimeout(() => {
            void (async (): Promise<void> => {
                await this._initData();

                await container.particles.redraw();
            })();
        }, timeout);
    }

    stop(): void {
        delete this.poissonDisc;
    }

    private async _initData(): Promise<void> {
        const container = this._container,
            poissonOptions = container.actualOptions.poisson,
            particlesOptions = container.actualOptions.particles,
            canvasSize = container.canvas.size,
            pixelRatio = container.retina.pixelRatio;

        if (!poissonOptions?.enable) {
            return;
        }

        this._currentIndex = 0;

        this.poissonDisc = new PoissonDisc(
            canvasSize,
            poissonOptions.radius
                ? poissonOptions.radius * pixelRatio
                : Math.max(
                      getRangeMax(particlesOptions.size.value) * pixelRatio,
                      Math.sqrt((canvasSize.width * canvasSize.height) / particlesOptions.number.value),
                  ),
            poissonOptions.retries,
            poissonOptions.dimensions,
        );

        const noSteps = 0;

        if (poissonOptions.steps > noSteps) {
            await this.poissonDisc.steps(poissonOptions.steps);
        } else {
            await this.poissonDisc.run();
        }
    }
}
