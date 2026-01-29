import {
  type Container,
  type IMovePathGenerator,
  type Particle,
  Vector,
  deepExtend,
  doublePI,
  getRandom,
} from "@tsparticles/engine";
import type { IFactorValues, IOffsetValues } from "./IFactorOffsetValues.js";
import type { INoiseFieldOptions } from "./INoiseFieldOptions.js";
import type { INoiseGenerator } from "./INoiseGenerator.js";

const originCoordinate = 0,
  firstIndex = 0,
  empty = 0,
  optionsSizeOffset = 1,
  transformDefaultValues = {
    a: 1,
    b: 0,
    c: 0,
    d: 1,
    e: 0,
    f: 0,
  },
  defaultOptions: INoiseFieldOptions = {
    draw: false,
    size: 20,
    increment: 0.004,
    columns: 0,
    rows: 0,
    layers: 0,
    width: 0,
    height: 0,
    factor: {
      angle: 0.02,
      length: 0.01,
    },
    offset: {
      x: 40000,
      y: 40000,
      z: 40000,
    },
  };

export abstract class NoiseFieldGenerator implements IMovePathGenerator {
  readonly container: Container;
  field: Vector[][][];
  readonly noiseGen: INoiseGenerator;
  noiseW: number;
  readonly options: INoiseFieldOptions;

  protected constructor(container: Container, noiseGen: INoiseGenerator) {
    this.container = container;
    this.noiseGen = noiseGen;
    this.field = [];
    this.noiseW = 0;
    this.options = deepExtend({}, defaultOptions) as INoiseFieldOptions;
  }

  generate(particle: Particle): Vector {
    const pos = particle.getPosition(),
      { size } = this.options,
      point = {
        x: Math.max(Math.floor(pos.x / size), originCoordinate),
        y: Math.max(Math.floor(pos.y / size), originCoordinate),
        z: Math.max(Math.floor(pos.z / size), originCoordinate),
      },
      { field } = this,
      fieldPoint = field[point.x]?.[point.y]?.[point.z];

    return fieldPoint ? fieldPoint.copy() : Vector.origin;
  }

  init(): void {
    this._setup();
  }

  reset(): void {
    // nothing to do
  }

  update(): void {
    this._calculateField();

    this.noiseW += this.options.increment;

    if (!this.options.draw) {
      return;
    }

    this.container.canvas.draw(ctx => {
      this._drawField(ctx);
    });
  }

  private _calculateField(): void {
    const { field, noiseGen, options, noiseW } = this,
      lengthFactor = options.factor.length,
      angleFactor = options.factor.angle;

    for (let x = 0; x < options.columns; x++) {
      const xColumn = field[x];

      if (!xColumn) {
        continue;
      }

      for (let y = 0; y < options.rows; y++) {
        const yColumn = xColumn[y];

        if (!yColumn) {
          continue;
        }

        for (let z = 0; z < options.layers; z++) {
          const cell = yColumn[z];

          if (!cell) {
            continue;
          }

          cell.length = noiseGen.noise4d(
            x * lengthFactor + options.offset.x,
            y * lengthFactor + options.offset.y,
            z * lengthFactor + options.offset.z,
            noiseW,
          );
          cell.angle = noiseGen.noise4d(x * angleFactor, y * angleFactor, z * angleFactor, noiseW) * doublePI;
        }
      }
    }
  }

  private _drawField(ctx: CanvasRenderingContext2D): void {
    const { field, options } = this;

    for (let x = 0; x < options.columns; x++) {
      const xColumn = field[x];

      if (!xColumn) {
        continue;
      }

      for (let y = 0; y < options.rows; y++) {
        const yColumn = xColumn[y];

        if (!yColumn) {
          continue;
        }

        const cell = yColumn[firstIndex]; // only 2D

        if (!cell) {
          continue;
        }

        const { angle, length } = cell;

        ctx.setTransform(
          transformDefaultValues.a,
          transformDefaultValues.b,
          transformDefaultValues.c,
          transformDefaultValues.d,
          x * this.options.size,
          y * this.options.size,
        );
        ctx.rotate(angle);
        ctx.strokeStyle = "white";
        ctx.beginPath();
        ctx.moveTo(originCoordinate, originCoordinate);
        ctx.lineTo(originCoordinate, this.options.size * length);
        ctx.stroke();
        ctx.setTransform(
          transformDefaultValues.a,
          transformDefaultValues.b,
          transformDefaultValues.c,
          transformDefaultValues.d,
          transformDefaultValues.e,
          transformDefaultValues.f,
        );
      }
    }
  }

  private _initField(): void {
    const { columns, rows, layers } = this.options;

    this.field = new Array<Vector[][]>(columns);

    for (let x = 0; x < columns; x++) {
      const newX = new Array<Vector[]>(rows);

      for (let y = 0; y < rows; y++) {
        const newY = new Array<Vector>(layers);

        for (let z = 0; z < layers; z++) {
          newY[z] = Vector.origin;
        }

        newX[y] = newY;
      }

      this.field[x] = newX;
    }
  }

  private _resetField(): void {
    const container = this.container,
      sourceOptions = container.actualOptions.particles.move.path.options,
      { options } = this;

    options.width = container.canvas.size.width;
    options.height = container.canvas.size.height;

    options.size = (sourceOptions["size"] as number) > empty ? (sourceOptions["size"] as number) : defaultOptions.size;
    options.increment =
      (sourceOptions["increment"] as number) > empty
        ? (sourceOptions["increment"] as number)
        : defaultOptions.increment;
    options.draw = !!sourceOptions["draw"];

    const offset = sourceOptions["offset"] as IOffsetValues | undefined;

    options.offset.x = offset?.x ?? defaultOptions.offset.x;
    options.offset.y = offset?.y ?? defaultOptions.offset.y;
    options.offset.z = offset?.z ?? defaultOptions.offset.z;

    const factor = sourceOptions["factor"] as IFactorValues | undefined;

    options.factor.angle = factor?.angle ?? defaultOptions.factor.angle;
    options.factor.length = factor?.length ?? defaultOptions.factor.length;

    options.seed = sourceOptions["seed"] as number | undefined;

    this.noiseGen.seed(options.seed ?? getRandom());

    options.columns = Math.floor(options.width / options.size) + optionsSizeOffset;
    options.rows = Math.floor(options.height / options.size) + optionsSizeOffset;
    options.layers = Math.floor(container.zLayers / options.size) + optionsSizeOffset;

    this._initField();
  }

  private _setup(): void {
    this.noiseW = 0;

    this._resetField();

    addEventListener("resize", () => {
      this._resetField();
    });
  }
}
