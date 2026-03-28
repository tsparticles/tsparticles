import { type Container, type Particle, Vector, deepExtend, doublePI, getRandom, identity } from "@tsparticles/engine";
import type { IFactorValues, IOffsetValues } from "./IFactorOffsetValues.js";
import { type IMovePathGenerator } from "@tsparticles/plugin-move";
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
  private readonly _container: Container;
  private _field: Vector[][][];
  private readonly _noiseGen: INoiseGenerator;
  private _noiseW: number;
  private readonly _options: INoiseFieldOptions;
  private readonly _res: Vector;

  protected constructor(container: Container, noiseGen: INoiseGenerator) {
    this._container = container;
    this._noiseGen = noiseGen;
    this._field = [];
    this._noiseW = 0;
    this._res = Vector.origin;
    this._options = deepExtend({}, defaultOptions) as INoiseFieldOptions;
  }

  generate(particle: Particle): Vector {
    const pos = particle.getPosition(),
      { size } = this._options,
      sizeFactor = identity / size,
      point = {
        x: Math.max(Math.floor(pos.x * sizeFactor), originCoordinate),
        y: Math.max(Math.floor(pos.y * sizeFactor), originCoordinate),
        z: Math.max(Math.floor(pos.z * sizeFactor), originCoordinate),
      },
      { _field } = this,
      fieldPoint = _field[point.x]?.[point.y]?.[point.z];

    if (fieldPoint) {
      this._res.x = fieldPoint.x;
      this._res.y = fieldPoint.y;
    } else {
      this._res.x = 0;
      this._res.y = 0;
    }

    return this._res;
  }

  init(): void {
    this._setup();
  }

  reset(): void {
    // nothing to do
  }

  update(): void {
    this._calculateField();

    this._noiseW += this._options.increment;

    if (!this._options.draw) {
      return;
    }

    this._container.canvas.draw(ctx => {
      this._drawField(ctx);
    });
  }

  private _calculateField(): void {
    const { _field, _noiseGen, _options, _noiseW } = this,
      lengthFactor = _options.factor.length,
      angleFactor = _options.factor.angle;

    for (let x = 0; x < _options.columns; x++) {
      const xColumn = _field[x];

      if (!xColumn) {
        continue;
      }

      for (let y = 0; y < _options.rows; y++) {
        const yColumn = xColumn[y];

        if (!yColumn) {
          continue;
        }

        for (let z = 0; z < _options.layers; z++) {
          const cell = yColumn[z];

          if (!cell) {
            continue;
          }

          cell.length = _noiseGen.noise4d(
            x * lengthFactor + _options.offset.x,
            y * lengthFactor + _options.offset.y,
            z * lengthFactor + _options.offset.z,
            _noiseW,
          );
          cell.angle = _noiseGen.noise4d(x * angleFactor, y * angleFactor, z * angleFactor, _noiseW) * doublePI;
        }
      }
    }
  }

  private _drawField(ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D): void {
    const { _field, _options } = this;

    for (let x = 0; x < _options.columns; x++) {
      const xColumn = _field[x];

      if (!xColumn) {
        continue;
      }

      for (let y = 0; y < _options.rows; y++) {
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
          x * this._options.size,
          y * this._options.size,
        );
        ctx.rotate(angle);
        ctx.strokeStyle = "white";
        ctx.beginPath();
        ctx.moveTo(originCoordinate, originCoordinate);
        ctx.lineTo(originCoordinate, this._options.size * length);
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
    const { columns, rows, layers } = this._options;

    this._field = new Array<Vector[][]>(columns);

    for (let x = 0; x < columns; x++) {
      const newX = new Array<Vector[]>(rows);

      for (let y = 0; y < rows; y++) {
        const newY = new Array<Vector>(layers);

        for (let z = 0; z < layers; z++) {
          newY[z] = Vector.origin;
        }

        newX[y] = newY;
      }

      this._field[x] = newX;
    }
  }

  private _resetField(): void {
    const container = this._container,
      sourceOptions = container.actualOptions.particles.move.path.options,
      { _options } = this;

    _options.width = container.canvas.size.width;
    _options.height = container.canvas.size.height;
    _options.size = (sourceOptions["size"] as number) > empty ? (sourceOptions["size"] as number) : defaultOptions.size;
    _options.increment =
      (sourceOptions["increment"] as number) > empty
        ? (sourceOptions["increment"] as number)
        : defaultOptions.increment;
    _options.draw = !!sourceOptions["draw"];

    const offset = sourceOptions["offset"] as IOffsetValues | undefined;

    _options.offset.x = offset?.x ?? defaultOptions.offset.x;
    _options.offset.y = offset?.y ?? defaultOptions.offset.y;
    _options.offset.z = offset?.z ?? defaultOptions.offset.z;

    const factor = sourceOptions["factor"] as IFactorValues | undefined;

    _options.factor.angle = factor?.angle ?? defaultOptions.factor.angle;
    _options.factor.length = factor?.length ?? defaultOptions.factor.length;
    _options.seed = sourceOptions["seed"] as number | undefined;

    this._noiseGen.seed(_options.seed ?? getRandom());

    _options.columns = Math.floor(_options.width / _options.size) + optionsSizeOffset;
    _options.rows = Math.floor(_options.height / _options.size) + optionsSizeOffset;
    _options.layers = Math.floor(container.zLayers / _options.size) + optionsSizeOffset;

    this._initField();
  }

  private _setup(): void {
    this._noiseW = 0;

    this._resetField();

    addEventListener("resize", () => {
      this._resetField();
    });
  }
}
