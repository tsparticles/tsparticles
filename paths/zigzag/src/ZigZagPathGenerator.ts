import {
  type Container,
  type IDelta,
  type IMovePathGenerator,
  type Particle,
  type RangeValue,
  Vector,
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

export class ZigZagPathGenerator implements IMovePathGenerator {
  options: IZigZagOptions;

  constructor() {
    this.options = {
      waveHeight: { min: 0, max: 3 },
      waveLength: { min: 0, max: 5 },
    };
  }

  generate(particle: ZigZagParticle, delta: IDelta): Vector {
    particle.zigzag ??= {
      counter: getRandom(),
      waveHeight: getRangeValue(this.options.waveHeight),
      waveLength: getRangeValue(this.options.waveLength),
    };

    const angularFrequency = (angularFrequencyFactor / particle.zigzag.waveLength) * delta.factor;

    particle.zigzag.counter += angularFrequency;

    const zigzagAngle = particle.zigzag.waveHeight * Math.sin(particle.zigzag.counter);

    particle.position.x += zigzagAngle * Math.cos(particle.velocity.angle + halfPI);
    particle.position.y += zigzagAngle * Math.sin(particle.velocity.angle + halfPI);

    return Vector.origin;
  }

  init(container: Container): void {
    const options = container.actualOptions.particles.move.path.options;

    this.options.waveLength = (options["waveLength"] as RangeValue | undefined) ?? this.options.waveLength;
    this.options.waveHeight = (options["waveHeight"] as RangeValue | undefined) ?? this.options.waveHeight;
  }

  reset(): void {
    // do nothing
  }

  update(): void {
    // do nothing
  }
}
