import {
  type Container,
  type IDelta,
  type Particle,
  type RangeValue,
  Vector,
  deepExtend,
  getRandom,
  getRangeValue,
  half,
} from "@tsparticles/engine";
import { type IMovePathGenerator } from "@tsparticles/plugin-move";

const angularFrequencyFactor = 0.5,
  halfPI = Math.PI * half;

/**
 * Zigzag path particle extension type
 */
export interface ZigZagParticle extends Particle {
  /** Zigzag data for this particle */
  zigzag?: ZigZagData;
}

/**
 * Zigzag path data for a particle
 */
export interface ZigZagData {
  /** Animation counter */
  counter: number;
  /** Height of the wave */
  waveHeight: number;
  /** Length of the wave */
  waveLength: number;
}

/**
 * Zigzag path generator options
 */
export interface IZigZagOptions {
  /** Wave height range */
  waveHeight: RangeValue;
  /** Wave length range */
  waveLength: RangeValue;
}

const defaultOptions: IZigZagOptions = {
  waveHeight: { min: 0, max: 3 },
  waveLength: { min: 0, max: 5 },
};

/** Zigzag path generator plugin */
export class ZigZagPathGenerator implements IMovePathGenerator {
  /** Zigzag path options */
  readonly options;

  /** The particles container */
  private readonly _container;
  /** The result vector */
  private readonly _res: Vector;

  /**
   * ZigZagPathGenerator constructor
   * @param container
   */
  constructor(container: Container) {
    this._container = container;
    this._res = Vector.origin;
    this.options = deepExtend({}, defaultOptions) as IZigZagOptions;
  }

  /**
   * Generates the next movement vector with zigzag oscillation
   * @param particle
   * @param delta
   */
  generate(particle: ZigZagParticle, delta: IDelta): Vector {
    const { options } = this;

    particle.zigzag ??= {
      counter: getRandom(),
      waveHeight: getRangeValue(options.waveHeight),
      waveLength: getRangeValue(options.waveLength),
    };

    const angularFrequency = (angularFrequencyFactor / particle.zigzag.waveLength) * delta.factor;

    particle.zigzag.counter += angularFrequency;

    const zigzagAngle = particle.zigzag.waveHeight * Math.sin(particle.zigzag.counter);

    particle.position.x += zigzagAngle * Math.cos(particle.velocity.angle + halfPI);
    particle.position.y += zigzagAngle * Math.sin(particle.velocity.angle + halfPI);

    this._res.x = 0;
    this._res.y = 0;

    return this._res;
  }

  /** Initializes the path generator options */
  init(): void {
    const sourceOptions = this._container.actualOptions.particles.move.path.options;

    this.options.waveLength = (sourceOptions["waveLength"] as RangeValue | undefined) ?? this.options.waveLength;
    this.options.waveHeight = (sourceOptions["waveHeight"] as RangeValue | undefined) ?? this.options.waveHeight;
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
