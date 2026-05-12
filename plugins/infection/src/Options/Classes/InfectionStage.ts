import { type IOptionLoader, OptionsColor, type RecursivePartial, isNull } from "@tsparticles/engine";
import type { IInfectionStage } from "../Interfaces/IInfectionStage.js";

/** Infection stage options */
export class InfectionStage implements IInfectionStage, IOptionLoader<IInfectionStage> {
  /** Infection stage particle color */
  color;
  /** Infection stage duration, after this time has passed it will go to the next stage */
  duration?: number;
  /** The infected stage set to the infected particles by the current stage */
  infectedStage?: number;
  /** Infection stage contagious area radius, if 0 only particles touching would be affected */
  radius;
  /** Infection rate, the higher it is, the more particles will be infected */
  rate;

  constructor() {
    this.color = new OptionsColor();
    this.color.value = "#ff0000";
    this.radius = 0;
    this.rate = 1;
  }

  load(data?: RecursivePartial<IInfectionStage>): void {
    if (isNull(data)) {
      return;
    }

    if (data.color !== undefined) {
      this.color = OptionsColor.create(this.color, data.color);
    }

    this.duration = data.duration;
    this.infectedStage = data.infectedStage;

    if (data.radius !== undefined) {
      this.radius = data.radius;
    }

    if (data.rate !== undefined) {
      this.rate = data.rate;
    }
  }
}
