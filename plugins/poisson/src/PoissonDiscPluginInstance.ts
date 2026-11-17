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
  #generation = 0;

  /**
   * Creates a new PoissonDiscPluginInstance
   * @param container - the poisson container
   */
  constructor(container: PoissonContainer) {
    this.#container = container;
    this.#currentIndex = 0;
  }

  destroy(): void {
    this.stop();
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

    if (this.redrawTimeout !== undefined) {
      clearTimeout(this.redrawTimeout);
      this.redrawTimeout = undefined;
    }

    const timeout = 250,
      generation = this.#generation;

    this.redrawTimeout = setTimeout(() => {
      this.redrawTimeout = undefined;

      void (async (): Promise<void> => {
        if (generation !== this.#generation) {
          return;
        }

        await this.#initData();

        if (this.#container.destroyed || generation !== this.#generation) {
          return;
        }

        await container.particles.redraw();
      })();
    }, timeout);
  }

  stop(): void {
    this.#generation++;

    if (this.redrawTimeout !== undefined) {
      clearTimeout(this.redrawTimeout);
      this.redrawTimeout = undefined;
    }

    delete this.poissonDisc;
  }

  async #initData(): Promise<void> {
    const generation = this.#generation,
      container = this.#container,
      poissonOptions = container.actualOptions.poisson,
      particlesOptions = container.actualOptions.particles,
      canvasSize = container.canvas.size,
      pixelRatio = container.retina.pixelRatio;

    if (!poissonOptions?.enable) {
      return;
    }

    this.#currentIndex = 0;

    const { PoissonDisc } = await import("./PoissonDisc.js");

    if (generation !== this.#generation || container.destroyed) {
      return;
    }

    const poissonDisc = new PoissonDisc(
        canvasSize,
        poissonOptions.radius
          ? poissonOptions.radius * pixelRatio
          : Math.max(
              getRangeMax((particlesOptions["size.value"] as number | undefined) ?? defaultSize) * pixelRatio,
              Math.sqrt((canvasSize.width * canvasSize.height) / particlesOptions.number.value),
            ),
        poissonOptions.retries,
        poissonOptions.dimensions,
        undefined,
        container.engine.getRandomFn(),
      ),
      noSteps = 0;

    if (poissonOptions.steps > noSteps) {
      poissonDisc.steps(poissonOptions.steps);
    } else {
      await poissonDisc.run();
    }

    if (generation === this.#generation) {
      this.poissonDisc = poissonDisc;
    }
  }
}
