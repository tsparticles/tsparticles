import { type IOptionLoader, type RecursivePartial, isNull, loadProperty } from "@tsparticles/engine";
import type { IInfection } from "../Interfaces/IInfection.js";
import { InfectionStage } from "./InfectionStage.js";

/**
 * [[include:Options/Plugins/Infection.md]]
 */
export class Infection implements IInfection, IOptionLoader<IInfection> {
  /** This property specifies if particles can turn back to the original state after being infected */
  cure;
  /** The infection delay of the new infected particles */
  delay;
  /** Enables the infection animations */
  enable;
  /** The initial number of infected particles */
  infections;
  /** This property contains all the infection stages configurations */
  stages: InfectionStage[];

  constructor() {
    this.cure = false;
    this.delay = 0;
    this.enable = false;
    this.infections = 0;
    this.stages = [];
  }

  load(data?: RecursivePartial<IInfection>): void {
    if (isNull(data)) {
      return;
    }

    loadProperty(this, "cure", data.cure);
    loadProperty(this, "delay", data.delay);
    loadProperty(this, "enable", data.enable);
    loadProperty(this, "infections", data.infections);

    if (data.stages === undefined) {
      return;
    }

    this.stages = data.stages.map(t => {
      const s = new InfectionStage();

      s.load(t);

      return s;
    });
  }
}
