import type { IOptionLoader, RecursivePartial } from "@tsparticles/engine";
import type { ITrailColorCoords } from "../Interfaces/ITrailColorCoords.js";
import { TrailColorComponent } from "./TrailColorComponent.js";

export class TrailColorCoords
  implements ITrailColorCoords, IOptionLoader<ITrailColorCoords>
{
  c?: TrailColorComponent = new TrailColorComponent();
  h?: TrailColorComponent = new TrailColorComponent();
  l?: TrailColorComponent = new TrailColorComponent();

  load(data?: RecursivePartial<ITrailColorCoords>): void {
    if (!data) {
      return;
    }

    if ("s" in data) {
      throw new Error(
        "Trail color coordinate 's' was removed in v5; migrate it to an explicitly selected OKLCH 'c' value.",
      );
    }

    if (data.h) {
      this.h ??= new TrailColorComponent();

      this.h.load(data.h);
    }

    if (data.c) {
      this.c ??= new TrailColorComponent();

      this.c.load(data.c);
    }

    if (data.l) {
      this.l ??= new TrailColorComponent();

      this.l.load(data.l);
    }
  }
}
