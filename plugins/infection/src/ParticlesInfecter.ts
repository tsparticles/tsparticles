import { type IDelta, double, getRandom } from "@tsparticles/engine";
import { type IInteractivityData, ParticlesInteractorBase } from "@tsparticles/plugin-interactivity";
import type { InfectableContainer, InfectableParticle } from "./Types.js";

const minStagesCount = 1;

/**
 */
export class ParticlesInfecter extends ParticlesInteractorBase<InfectableContainer> {
  private _maxDistance;

  constructor(container: InfectableContainer) {
    super(container);

    this._maxDistance = 0;
  }

  get maxDistance(): number {
    return this._maxDistance;
  }

  clear(): void {
    // do nothing
  }

  init(): void {
    // do nothing
  }

  interact(p1: InfectableParticle, _interactivityData: IInteractivityData, delta: IDelta): void {
    const infecter = this.container.infecter;

    if (!infecter) {
      return;
    }

    infecter.updateInfection(p1, delta.value);

    if (p1.infection?.stage === undefined) {
      return;
    }

    const container = this.container,
      options = container.actualOptions,
      infectionOptions = options.infection;

    if (!infectionOptions?.enable || infectionOptions.stages.length < minStagesCount) {
      return;
    }

    const infectionStage1 = infectionOptions.stages[p1.infection.stage];

    if (!infectionStage1) {
      return;
    }

    this._maxDistance = Math.max(this._maxDistance, infectionStage1.radius);

    const pxRatio = container.retina.pixelRatio,
      radius = p1.getRadius() * double + infectionStage1.radius * pxRatio,
      pos = p1.getPosition(),
      infectedStage1 = infectionStage1.infectedStage ?? p1.infection.stage,
      query = container.particles.grid.queryCircle(pos, radius),
      infections = infectionStage1.rate,
      neighbors = query.length;

    for (const p2 of query) {
      const infP2 = p2 as InfectableParticle;

      if (
        infP2 === p1 ||
        infP2.destroyed ||
        infP2.spawning ||
        !(infP2.infection?.stage === undefined || infP2.infection.stage !== p1.infection.stage) ||
        getRandom() >= infections / neighbors
      ) {
        continue;
      }

      if (infP2.infection?.stage === undefined) {
        infecter.startInfection(infP2, infectedStage1);
      } else if (infP2.infection.stage < p1.infection.stage) {
        infecter.updateInfectionStage(infP2, infectedStage1);
      } else if (infP2.infection.stage > p1.infection.stage) {
        const infectionStage2 = infectionOptions.stages[infP2.infection.stage];

        if (!infectionStage2) {
          continue;
        }

        const infectedStage2 = infectionStage2.infectedStage ?? infP2.infection.stage;

        infecter.updateInfectionStage(p1, infectedStage2);
      }
    }
  }

  isEnabled(): boolean {
    return this.container.actualOptions.infection?.enable ?? false;
  }

  reset(): void {
    // do nothing
  }
}
