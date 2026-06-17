import { type IContainerPlugin, type ICoordinates, getRangeMax } from "@tsparticles/engine";
import type { PoissonContainer } from "./types.js";
import type { PoissonDisc } from "./PoissonDisc.js";

const defaultSize = 1;

/**
 * Poisson Disc manager
 */
export class PoissonDiscPluginInstance implements IContainerPlugin {
  /** The poisson disc sampler */
  poissonDisc?: PoissonDisc;
  /** The redraw timeout handle */
  redrawTimeout?: number;

  /** The poisson container */
  readonly #container: PoissonContainer;
  /** The current point index */
  #currentIndex: number;

  /**
   * Creates a new PoissonDiscPluginInstance
   * @param container - the poisson container
   */
  constructor(container: PoissonContainer) {
    this.#container = container;
    this.#currentIndex = 0;
  }

  async init(): Promise<void> {
    await this.#initData();
  }

  particlePosition(position?: ICoordinates): ICoordinates | undefined {
    const container = this.#container,
      options = container.actualOptions.poisson;

    if (!this.poissonDisc || !(options?.enable ?? false) || this.#currentIndex >= this.poissonDisc.points.length) {
      return;
    }

    return position ?? this.poissonDisc.points[this.#currentIndex++]?.position;
  }

  resize(): void {
    const container = this.#container,
      options = container.actualOptions.poisson;

    if (!(options?.enable ?? false)) {
      return;
    }

    if (this.redrawTimeout) {
      clearTimeout(this.redrawTimeout);
    }

    const timeout = 250;

    this.redrawTimeout = setTimeout(() => {
      void (async (): Promise<void> => {
        if (this.#container.destroyed) {
          return;
        }

        await this.#initData();

        await container.particles.redraw();
      })();
    }, timeout);
  }

  stop(): void {
    delete this.poissonDisc;
  }

  async #initData(): Promise<void> {
    const container = this.#container,
      poissonOptions = container.actualOptions.poisson,
      particlesOptions = container.actualOptions.particles,
      canvasSize = container.canvas.size,
      pixelRatio = container.retina.pixelRatio;

    if (!poissonOptions?.enable) {
      return;
    }

    this.#currentIndex = 0;

    const { PoissonDisc } = await import("./PoissonDisc.js");

    this.poissonDisc = new PoissonDisc(
      canvasSize,
      poissonOptions.radius
        ? poissonOptions.radius * pixelRatio
        : Math.max(
            getRangeMax((particlesOptions["size.value"] as number | undefined) ?? defaultSize) * pixelRatio,
            Math.sqrt((canvasSize.width * canvasSize.height) / particlesOptions.number.value),
          ),
      poissonOptions.retries,
      poissonOptions.dimensions,
    );

    const noSteps = 0;

    if (poissonOptions.steps > noSteps) {
      this.poissonDisc.steps(poissonOptions.steps);
    } else {
      await this.poissonDisc.run();
    }
  }
}
