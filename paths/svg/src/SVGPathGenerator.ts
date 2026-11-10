/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  type Container,
  type ICoordinates,
  type ICoordinatesWithMode,
  type IDelta,
  type IDimension,
  type Particle,
  PixelMode,
  Vector,
  getLogger,
  getPosition,
  getRandom,
  half,
  minIndex,
  randomInRangeValue,
} from "@tsparticles/engine";
import type { IMovePathGenerator } from "@tsparticles/plugin-move";
import type { SVGPathData } from "./types.js";
import { createSVGPaths } from "./createSVGPaths.js";
import { loadSVGFromString } from "./loadSVGFromString.js";

/** SVG path direction */
export enum SVGPathDirection {
  normal,
  reverse,
}

const minStep = 0,
  minWidth = 0,
  minScale = 1;

/**
 * SVG path particle extension type
 */
export type SVGPathParticle = Particle & {
  /** Direction along the SVG path */
  svgDirection?: SVGPathDirection;
  /** Initial position when the particle started following the path */
  svgInitialPosition?: ICoordinates;
  /** Offset from the path */
  svgOffset?: IDimension;
  /** Current path index */
  svgPathIndex?: number;
  /** Speed along the path */
  svgSpeed?: number;
  /** Current step on the path */
  svgStep?: number;
};

/** @internal */
interface SVGPathOptions {
  path?: {
    data: string[];
    size: IDimension;
  };
  position?: ICoordinatesWithMode;
  reverse?: boolean;
  scale?: number;
  url?: string;
  width?: number;
}

/** SVG path generator plugin */
export class SVGPathGenerator implements IMovePathGenerator {
  /** The particles container */
  readonly #container;
  /** The position offset */
  readonly #offset: ICoordinatesWithMode;
  /** The parsed SVG paths */
  #paths: SVGPathData[];
  #ready: boolean;
  #requestId: number;
  /** The result vector */
  readonly #res: Vector;
  /** Whether to reverse path direction */
  #reverse: boolean;
  /** The scale factor */
  #scale: number;
  /** The SVG size */
  readonly #size: IDimension;
  /** The path width */
  #width: number;

  /**
   * SVGPathGenerator constructor
   * @param container - The container to handle
   */
  constructor(container: Container) {
    this.#container = container;
    this.#paths = [];
    this.#ready = false;
    this.#reverse = false;
    this.#size = { width: 0, height: 0 };
    this.#scale = 1;
    this.#offset = { x: 0, y: 0, mode: PixelMode.percent };
    this.#width = 0;
    this.#requestId = 0;
    this.#res = Vector.origin;
  }

  /**
   * Generates the next position along the SVG path
   * @param particle - The particle to process
   * @param delta - The delta time
   * @returns The result
   */
  generate(particle: SVGPathParticle, delta: IDelta): Vector {
    if (!this.#ready) {
      this.#res.x = 0;
      this.#res.y = 0;

      return this.#res;
    }

    const container = this.#container,
      pxRatio = container.retina.pixelRatio;

    particle.svgDirection ??= getRandom() > half ? SVGPathDirection.normal : SVGPathDirection.reverse;
    particle.svgPathIndex ??= Math.floor(getRandom() * this.#paths.length);
    particle.svgSpeed ??= particle.velocity.mult(particle.retina.moveSpeed * half).length;
    particle.svgStep ??= randomInRangeValue({ min: 0, max: this.#paths[particle.svgPathIndex]!.length }) * pxRatio;
    particle.svgOffset ??= {
      width: randomInRangeValue({ min: -this.#width * half, max: this.#width * half }) * pxRatio,
      height: randomInRangeValue({ min: -this.#width * half, max: this.#width * half }) * pxRatio,
    };
    particle.svgInitialPosition ??= particle.position.copy();
    particle.velocity.x = 0;
    particle.velocity.y = 0;

    if (particle.svgDirection === SVGPathDirection.normal) {
      particle.svgStep += particle.svgSpeed * delta.factor;
    } else {
      particle.svgStep -= particle.svgSpeed * delta.factor;
    }

    let path = this.#paths[particle.svgPathIndex]!;

    const pathLength = path.length,
      indexOffset = 1;

    if (particle.svgStep >= pathLength) {
      particle.svgPathIndex = particle.svgPathIndex + indexOffset;

      if (particle.svgPathIndex >= this.#paths.length) {
        if (this.#reverse) {
          particle.svgPathIndex = this.#paths.length - indexOffset;

          particle.svgDirection = SVGPathDirection.reverse;
        } else {
          particle.svgPathIndex = 0;

          particle.svgStep = 0;
        }
      }
    } else if (particle.svgStep <= minStep) {
      particle.svgPathIndex = particle.svgPathIndex - indexOffset;

      if (particle.svgPathIndex < minIndex) {
        if (this.#reverse) {
          particle.svgPathIndex = 0;

          particle.svgDirection = SVGPathDirection.normal;
        } else {
          particle.svgPathIndex = this.#paths.length - indexOffset;

          path = this.#paths[particle.svgPathIndex]!;

          particle.svgStep = path.length;
        }
      }
    }

    path = this.#paths[particle.svgPathIndex]!;

    const pathElement = path.element,
      pos = pathElement.getPointAtLength(particle.svgStep),
      canvasSize = this.#container.canvas.size,
      offset = getPosition(this.#offset, canvasSize),
      scale = this.#scale * pxRatio;

    particle.position.x =
      (pos.x - this.#size.width * half) * scale + particle.svgInitialPosition.x + offset.x + particle.svgOffset.width;
    particle.position.y =
      (pos.y - this.#size.height * half) * scale + particle.svgInitialPosition.y + offset.y + particle.svgOffset.height;

    this.#res.x = 0;
    this.#res.y = 0;

    return this.#res;
  }

  /** Initializes the SVG path data */
  init(): void {
    const options = this.#container.actualOptions.particles.move.path.options as SVGPathOptions,
      position = options.position ?? this.#offset;

    this.#reverse = options.reverse ?? this.#reverse;
    this.#scale = options.scale ?? minScale;
    this.#offset.x = position.x;
    this.#offset.y = position.y;
    this.#offset.mode = position.mode;
    this.#width = options.width ?? minWidth;
    const requestId = ++this.#requestId;

    this.#paths = [];
    this.#ready = false;

    if (options.url && !options.path) {
      const url = options.url;

      void (async (): Promise<void> => {
        try {
          const response = await fetch(url);

          if (!response.ok) {
            throw new Error(`Failed to load SVG path from ${url}: ${response.status} ${response.statusText}`);
          }

          const data = await response.text(),
            { paths, size } = loadSVGFromString(data);

          if (requestId !== this.#requestId) {
            return;
          }

          this.#paths = paths;
          this.#ready = paths.some(path => path.length > 0);
          this.#size.width = size.width;
          this.#size.height = size.height;
        } catch (error) {
          if (requestId === this.#requestId) {
            getLogger().error("error loading SVG path", error);
          }
        }
      })();
    } else if (options.path) {
      const path = options.path;

      this.#paths = createSVGPaths(options.path.data);
      this.#ready = this.#paths.some(path => path.length > 0);
      this.#size.height = path.size.height;
      this.#size.width = path.size.width;
    }
  }

  /** Resets the path generator (no-op) */
  reset(): void {
    this.#requestId++;
  }

  /** Updates the path generator (no-op) */
  update(): void {
    // do nothing
  }
}
