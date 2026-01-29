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
  options;

  constructor() {
    this.options = new Map<Container, IZigZagOptions>();
  }

  generate(particle: ZigZagParticle, delta: IDelta): Vector {
    const options = this.options.get(particle.container) ?? (deepExtend({}, defaultOptions) as IZigZagOptions);

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

    return Vector.origin;
  }

  init(container: Container): void {
    const sourceOptions = container.actualOptions.particles.move.path.options,
      options = deepExtend({}, defaultOptions) as IZigZagOptions;

    options.waveLength = (sourceOptions["waveLength"] as RangeValue | undefined) ?? options.waveLength;
    options.waveHeight = (sourceOptions["waveHeight"] as RangeValue | undefined) ?? options.waveHeight;

    this.options.set(container, options);
  }

  reset(): void {
    // do nothing
  }

  update(): void {
    // do nothing
  }
}
