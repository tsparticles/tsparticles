import {
  type Container,
  type IMovePathGenerator,
  Vector,
  deepExtend,
  doublePI,
  getRandom,
  isFunction,
  isString,
} from "@tsparticles/engine";
import { CurvesPathGen } from "./Curves.js";
import type { CurvesPathParticle } from "./CurvesPathParticle.js";
import type { ICurvesOptions } from "./ICurvesOptions.js";

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

  constructor() {
    this.options = new Map<Container, ICurvesOptions>();
  }

  generate(particle: CurvesPathParticle): Vector {
    if (!particle.pathGen) {
      const options = this.options.get(particle.container) ?? (deepExtend({}, defaultOptions) as ICurvesOptions);

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

  init(container: Container): void {
    const sourceOptions = container.actualOptions.particles.move.path.options,
      options = deepExtend({}, defaultOptions) as ICurvesOptions;

    if (isFunction(sourceOptions["rndFunc"])) {
      options.rndFunc = sourceOptions["rndFunc"] as () => number;
    } else if (isString(sourceOptions["rndFunc"])) {
      options.rndFunc =
        ((globalThis as Record<string, unknown>)[sourceOptions["rndFunc"]] as (() => number) | null | undefined) ??
        options.rndFunc;
    }

    options.period = (sourceOptions["period"] as number | undefined) ?? options.period;
    options.nbHarmonics = (sourceOptions["nbHarmonics"] as number | undefined) ?? options.nbHarmonics;
    options.attenHarmonics = (sourceOptions["attenHarmonics"] as number | undefined) ?? options.attenHarmonics;
    options.lowValue = (sourceOptions["lowValue"] as number | undefined) ?? options.lowValue;
    options.highValue = (sourceOptions["highValue"] as number | undefined) ?? options.highValue;

    this.options.set(container, options);
  }

  reset(particle: CurvesPathParticle): void {
    delete particle.pathGen;
    delete particle.curveVelocity;
  }

  update(): void {
    // do nothing
  }
}
