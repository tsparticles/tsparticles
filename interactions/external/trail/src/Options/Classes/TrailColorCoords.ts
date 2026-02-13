import type { IOptionLoader, RecursivePartial } from "@tsparticles/engine";
import type { ITrailColorCoords } from "../Interfaces/ITrailColorCoords.js";
import { TrailColorComponent } from "./TrailColorComponent.js";

export class TrailColorCoords implements ITrailColorCoords, IOptionLoader<ITrailColorCoords> {
  h?: TrailColorComponent;
  l?: TrailColorComponent;
  s?: TrailColorComponent;

  constructor() {
    this.h = new TrailColorComponent();
    this.s = new TrailColorComponent();
    this.l = new TrailColorComponent();
  }

  load(data?: RecursivePartial<ITrailColorCoords>): void {
    if (!data) {
      return;
    }

    if (data.h) {
      this.h ??= new TrailColorComponent();

      this.h.load(data.h);
    }

    if (data.s) {
      this.s ??= new TrailColorComponent();

      this.s.load(data.s);
    }

    if (data.l) {
      this.l ??= new TrailColorComponent();

      this.l.load(data.l);
    }
  }
}
