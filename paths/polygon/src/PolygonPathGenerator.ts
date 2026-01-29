/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  type Container,
  type ICoordinates,
  type IMovePathGenerator,
  Vector,
  deepExtend,
  getRandom,
} from "@tsparticles/engine";
import type { IPolygonPathOptions } from "./IPolygonPathOptions.js";
import type { PolygonPathParticle } from "./PolygonPathParticle.js";

const defaultOptions = {
  sides: 6,
  turnSteps: 20,
  angle: 30,
};

export class PolygonPathGenerator implements IMovePathGenerator {
  dirsList;
  readonly options;

  constructor() {
    this.dirsList = new Map<Container, ICoordinates[]>();
    this.options = new Map<Container, IPolygonPathOptions>();
  }

  generate(p: PolygonPathParticle): Vector {
    const options = this.options.get(p.container) ?? (deepExtend({}, defaultOptions) as IPolygonPathOptions),
      { sides, turnSteps } = options;

    p.hexStep ??= 0;
    p.hexDirection ??= sides === 6 ? ((getRandom() * 3) | 0) * 2 : (getRandom() * sides) | 0;
    p.hexSpeed ??= p.velocity.length;

    if (p.hexStep % turnSteps === 0) {
      p.hexDirection = getRandom() > 0.5 ? (p.hexDirection + 1) % sides : (p.hexDirection + sides - 1) % sides;
    }

    p.velocity.x = 0;
    p.velocity.y = 0;

    p.hexStep++;

    let dirsList = this.dirsList.get(p.container);

    if (!dirsList) {
      dirsList = [];

      this.dirsList.set(p.container, dirsList);
    }

    const direction = dirsList[p.hexDirection]!;

    return Vector.create(direction.x * p.hexSpeed, direction.y * p.hexSpeed);
  }

  init(container: Container): void {
    const sourceOptions = container.actualOptions.particles.move.path.options,
      options = deepExtend({}, defaultOptions) as IPolygonPathOptions;

    options.sides = (sourceOptions["sides"] as number) > 0 ? (sourceOptions["sides"] as number) : options.sides;
    options.angle = (sourceOptions["angle"] as number | undefined) ?? options.angle;
    options.turnSteps =
      (sourceOptions["turnSteps"] as number) >= 0 ? (sourceOptions["turnSteps"] as number) : options.turnSteps;

    this.options.set(container, options);

    this._createDirs(container);
  }

  reset(particle: PolygonPathParticle): void {
    delete particle.hexStep;
    delete particle.hexDirection;
    delete particle.hexSpeed;
  }

  update(): void {
    // do nothing
  }

  private readonly _createDirs: (container: Container) => void = container => {
    const dirsList = [],
      options = this.options.get(container) ?? (deepExtend({}, defaultOptions) as IPolygonPathOptions);

    for (let i = 0; i < 360; i += 360 / options.sides) {
      const angle = options.angle + i;

      dirsList.push(Vector.create(Math.cos((angle * Math.PI) / 180), Math.sin((angle * Math.PI) / 180)));
    }

    this.dirsList.set(container, dirsList);
  };
}
