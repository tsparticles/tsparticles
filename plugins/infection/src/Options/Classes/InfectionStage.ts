import { type IOptionLoader, OptionsColor, type RecursivePartial, isNull, loadProperty } from "@tsparticles/engine";
import type { IInfectionStage } from "../Interfaces/IInfectionStage.js";

/** Infection stage options */
export class InfectionStage implements IInfectionStage, IOptionLoader<IInfectionStage> {
  /** Infection stage particle color */
  color = new OptionsColor();
  /** Infection stage duration, after this time has passed it will go to the next stage */
  duration?: number;
  /** The infected stage set to the infected particles by the current stage */
  infectedStage?: number;
  /** Infection stage contagious area radius, if 0 only particles touching would be affected */
  radius = 0;
  /** Infection rate, the higher it is, the more particles will be infected */
  rate = 1;

  constructor() {
    this.color.value = "#ff0000";
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

    loadProperty(this, "radius", data.radius);
    loadProperty(this, "rate", data.rate);
  }
}
