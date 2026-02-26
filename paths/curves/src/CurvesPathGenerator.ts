import { type Container, Vector, deepExtend, doublePI, getRandom, isFunction, isString } from "@tsparticles/engine";
import { CurvesPathGen } from "./Curves.js";
import type { CurvesPathParticle } from "./CurvesPathParticle.js";
import type { ICurvesOptions } from "./ICurvesOptions.js";
import { type IMovePathGenerator } from "@tsparticles/move-base";

const defaultOptions: ICurvesOptions = {
  rndFunc: null,
  period: 100,
  nbHarmonics: 2,
  attenHarmonics: 0.8,
  lowValue: -0.03,
  highValue: 0.03,
};

/**
 * @returns a random velocity
 */
function randomVelocity(): number {
  const offset = 0.8,
    factor = 0.6;

  return getRandom() * factor + offset;
}

export class CurvesPathGenerator implements IMovePathGenerator {
  readonly options;

  private readonly _container;

  constructor(container: Container) {
    this._container = container;

    this.options = deepExtend({}, defaultOptions) as ICurvesOptions;
  }

  generate(particle: CurvesPathParticle): Vector {
    if (!particle.pathGen) {
      const { options } = this;

      particle.pathGen = CurvesPathGen(
        options.rndFunc,
        options.period,
        options.nbHarmonics,
        options.attenHarmonics,
        options.lowValue,
        options.highValue,
      );
    }

    if (particle.curveVelocity) {
      particle.curveVelocity.length += 0.01;
      particle.curveVelocity.angle = (particle.curveVelocity.angle + particle.pathGen()) % doublePI;
    } else {
      particle.curveVelocity = Vector.origin;

      particle.curveVelocity.length = randomVelocity();
      particle.curveVelocity.angle = getRandom() * doublePI;
    }

    particle.velocity.x = 0;
    particle.velocity.y = 0;

    return particle.curveVelocity;
  }

  init(): void {
    const sourceOptions = this._container.actualOptions.particles.move.path.options;

    if (isFunction(sourceOptions["rndFunc"])) {
      this.options.rndFunc = sourceOptions["rndFunc"] as () => number;
    } else if (isString(sourceOptions["rndFunc"])) {
      this.options.rndFunc =
        ((globalThis as Record<string, unknown>)[sourceOptions["rndFunc"]] as (() => number) | null | undefined) ??
        this.options.rndFunc;
    }

    this.options.period = (sourceOptions["period"] as number | undefined) ?? this.options.period;
    this.options.nbHarmonics = (sourceOptions["nbHarmonics"] as number | undefined) ?? this.options.nbHarmonics;
    this.options.attenHarmonics =
      (sourceOptions["attenHarmonics"] as number | undefined) ?? this.options.attenHarmonics;
    this.options.lowValue = (sourceOptions["lowValue"] as number | undefined) ?? this.options.lowValue;
    this.options.highValue = (sourceOptions["highValue"] as number | undefined) ?? this.options.highValue;
  }

  reset(particle: CurvesPathParticle): void {
    delete particle.pathGen;
    delete particle.curveVelocity;
  }

  update(): void {
    // do nothing
  }
}
