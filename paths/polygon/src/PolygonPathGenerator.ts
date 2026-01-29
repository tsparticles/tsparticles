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
  dirsList: ICoordinates[];
  readonly options;
  private readonly _container;

  constructor(container: Container) {
    this._container = container;
    this.dirsList = [];
    this.options = deepExtend({}, defaultOptions) as IPolygonPathOptions;
  }

  generate(p: PolygonPathParticle): Vector {
    const { sides, turnSteps } = this.options;

    p.hexStep ??= 0;
    p.hexDirection ??= sides === 6 ? ((getRandom() * 3) | 0) * 2 : (getRandom() * sides) | 0;
    p.hexSpeed ??= p.velocity.length;

    if (p.hexStep % turnSteps === 0) {
      p.hexDirection = getRandom() > 0.5 ? (p.hexDirection + 1) % sides : (p.hexDirection + sides - 1) % sides;
    }

    p.velocity.x = 0;
    p.velocity.y = 0;

    p.hexStep++;

    const direction = this.dirsList[p.hexDirection]!;

    return Vector.create(direction.x * p.hexSpeed, direction.y * p.hexSpeed);
  }

  init(): void {
    const container = this._container,
      sourceOptions = container.actualOptions.particles.move.path.options;

    this.options.sides =
      (sourceOptions["sides"] as number) > 0 ? (sourceOptions["sides"] as number) : this.options.sides;
    this.options.angle = (sourceOptions["angle"] as number | undefined) ?? this.options.angle;
    this.options.turnSteps =
      (sourceOptions["turnSteps"] as number) >= 0 ? (sourceOptions["turnSteps"] as number) : this.options.turnSteps;

    this._createDirs();
  }

  reset(particle: PolygonPathParticle): void {
    delete particle.hexStep;
    delete particle.hexDirection;
    delete particle.hexSpeed;
  }

  update(): void {
    // do nothing
  }

  private readonly _createDirs = (): void => {
    const { options } = this;

    this.dirsList = [];

    for (let i = 0; i < 360; i += 360 / options.sides) {
      const angle = options.angle + i;

      this.dirsList.push(Vector.create(Math.cos((angle * Math.PI) / 180), Math.sin((angle * Math.PI) / 180)));
    }
  };
}
