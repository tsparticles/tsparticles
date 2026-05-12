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
  getPosition,
  getRandom,
  half,
  randomInRangeValue,
} from "@tsparticles/engine";
import { type IMovePathGenerator } from "@tsparticles/plugin-move";
import type { SVGPathData } from "./types.js";
import { createSVGPaths } from "./createSVGPaths.js";
import { loadSVGFromString } from "./loadSVGFromString.js";

/** SVG path direction */
export enum SVGPathDirection {
  normal,
  reverse,
}

const minStep = 0,
  minIndex = 0,
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
  private readonly _container;
  /** The position offset */
  private readonly _offset: ICoordinatesWithMode;
  /** The parsed SVG paths */
  private _paths: SVGPathData[];
  /** The result vector */
  private readonly _res: Vector;
  /** Whether to reverse path direction */
  private _reverse: boolean;
  /** The scale factor */
  private _scale: number;
  /** The SVG size */
  private readonly _size: IDimension;
  /** The path width */
  private _width: number;

  /**
   * SVGPathGenerator constructor
   * @param container
   */
  constructor(container: Container) {
    this._container = container;
    this._paths = [];
    this._reverse = false;
    this._size = { width: 0, height: 0 };
    this._scale = 1;
    this._offset = { x: 0, y: 0, mode: PixelMode.percent };
    this._width = 0;
    this._res = Vector.origin;
  }

  /**
   * Generates the next position along the SVG path
   * @param particle
   * @param delta
   */
  generate(particle: SVGPathParticle, delta: IDelta): Vector {
    const container = this._container,
      pxRatio = container.retina.pixelRatio;

    particle.svgDirection ??= getRandom() > half ? SVGPathDirection.normal : SVGPathDirection.reverse;
    particle.svgPathIndex ??= Math.floor(getRandom() * this._paths.length);
    particle.svgSpeed ??= particle.velocity.mult(particle.retina.moveSpeed * half).length;
    particle.svgStep ??= randomInRangeValue({ min: 0, max: this._paths[particle.svgPathIndex]!.length }) * pxRatio;
    particle.svgOffset ??= {
      width: randomInRangeValue({ min: -this._width * half, max: this._width * half }) * pxRatio,
      height: randomInRangeValue({ min: -this._width * half, max: this._width * half }) * pxRatio,
    };
    particle.svgInitialPosition ??= particle.position.copy();
    particle.velocity.x = 0;
    particle.velocity.y = 0;

    if (particle.svgDirection === SVGPathDirection.normal) {
      particle.svgStep += particle.svgSpeed * delta.factor;
    } else {
      particle.svgStep -= particle.svgSpeed * delta.factor;
    }

    let path = this._paths[particle.svgPathIndex]!;

    const pathLength = path.length,
      indexOffset = 1;

    if (particle.svgStep >= pathLength) {
      particle.svgPathIndex = particle.svgPathIndex + indexOffset;

      if (particle.svgPathIndex >= this._paths.length) {
        if (this._reverse) {
          particle.svgPathIndex = this._paths.length - indexOffset;

          particle.svgDirection = SVGPathDirection.reverse;
        } else {
          particle.svgPathIndex = 0;

          particle.svgStep = 0;
        }
      }
    } else if (particle.svgStep <= minStep) {
      particle.svgPathIndex = particle.svgPathIndex - indexOffset;

      if (particle.svgPathIndex < minIndex) {
        if (this._reverse) {
          particle.svgPathIndex = 0;

          particle.svgDirection = SVGPathDirection.normal;
        } else {
          particle.svgPathIndex = this._paths.length - indexOffset;

          path = this._paths[particle.svgPathIndex]!;

          particle.svgStep = path.length;
        }
      }
    }

    path = this._paths[particle.svgPathIndex]!;

    const pathElement = path.element,
      pos = pathElement.getPointAtLength(particle.svgStep),
      canvasSize = this._container.canvas.size,
      offset = getPosition(this._offset, canvasSize),
      scale = this._scale * pxRatio;

    particle.position.x =
      (pos.x - this._size.width * half) * scale + particle.svgInitialPosition.x + offset.x + particle.svgOffset.width;
    particle.position.y =
      (pos.y - this._size.height * half) * scale + particle.svgInitialPosition.y + offset.y + particle.svgOffset.height;

    this._res.x = 0;
    this._res.y = 0;

    return this._res;
  }

  /** Initializes the SVG path data */
  init(): void {
    const options = this._container.actualOptions.particles.move.path.options as SVGPathOptions,
      position = options.position ?? this._offset;

    this._reverse = options.reverse ?? this._reverse;
    this._scale = options.scale ?? minScale;
    this._offset.x = position.x;
    this._offset.y = position.y;
    this._offset.mode = position.mode;
    this._width = options.width ?? minWidth;

    if (options.url && !options.path) {
      const url = options.url;

      void (async (): Promise<void> => {
        const response = await fetch(url),
          data = await response.text(),
          { paths, size } = loadSVGFromString(data);

        this._paths = paths;
        this._size.width = size.width;
        this._size.height = size.height;
      })();
    } else if (options.path) {
      const path = options.path;

      this._paths = createSVGPaths(options.path.data);
      this._size.height = path.size.height;
      this._size.width = path.size.width;
    }
  }

  /** Resets the path generator (no-op) */
  reset(): void {
    // do nothing
  }

  /** Updates the path generator (no-op) */
  update(): void {
    // do nothing
  }
}
