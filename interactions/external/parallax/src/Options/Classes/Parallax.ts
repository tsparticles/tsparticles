import { type IOptionLoader, type RecursivePartial, isNull, loadProperty } from "@tsparticles/engine";
import type { IParallax } from "../Interfaces/IParallax.js";

/** Parallax effect options */
export class Parallax implements IParallax, IOptionLoader<IParallax> {
  /** The parallax force */
  force = 2;
  /** The parallax smoothing factor */
  smooth = 10;

  /** @inheritDoc */
  load(data?: RecursivePartial<IParallax>): void {
    if (isNull(data)) {
      return;
    }

    loadProperty(this, "force", data.force);
    loadProperty(this, "smooth", data.smooth);
  }
}
