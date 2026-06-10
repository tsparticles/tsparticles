import { type IOptionLoader, type RecursivePartial, isNull, loadProperty } from "@tsparticles/engine";
import type { IParallax } from "../Interfaces/IParallax.js";

/** Parallax effect options */
export class Parallax implements IParallax, IOptionLoader<IParallax> {
  /** The parallax force */
  force;

  /** The parallax smoothing factor */
  smooth;

  constructor() {
    this.force = 2;
    this.smooth = 10;
  }

  /** @inheritDoc */
  load(data?: RecursivePartial<IParallax>): void {
    if (isNull(data)) {
      return;
    }

    loadProperty(this, "force", data.force);
    loadProperty(this, "smooth", data.smooth);
  }
}
