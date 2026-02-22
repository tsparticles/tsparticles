import {
  type Container,
  type IDelta,
  type IMovePathGenerator,
  type Particle,
  type RangeValue,
  Vector,
  deepExtend,
  getRandom,
  getRangeValue,
  half,
} from "@tsparticles/engine";

const angularFrequencyFactor = 0.5,
  halfPI = Math.PI * half;

interface ZigZagParticle extends Particle {
  zigzag?: ZigZagData;
}

interface ZigZagData {
  counter: number;
  waveHeight: number;
  waveLength: number;
}

interface IZigZagOptions {
  waveHeight: RangeValue;
  waveLength: RangeValue;
}

const defaultOptions: IZigZagOptions = {
  waveHeight: { min: 0, max: 3 },
  waveLength: { min: 0, max: 5 },
};

export class ZigZagPathGenerator implements IMovePathGenerator {
  readonly options;

  private readonly _container;
  private readonly _res: Vector;

  constructor(container: Container) {
    this._container = container;
    this._res = Vector.origin;
    this.options = deepExtend({}, defaultOptions) as IZigZagOptions;
  }

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

  init(): void {
    const sourceOptions = this._container.actualOptions.particles.move.path.options;

    this.options.waveLength = (sourceOptions["waveLength"] as RangeValue | undefined) ?? this.options.waveLength;
    this.options.waveHeight = (sourceOptions["waveHeight"] as RangeValue | undefined) ?? this.options.waveHeight;
  }

  reset(): void {
    // do nothing
  }

  update(): void {
    // do nothing
  }
}
