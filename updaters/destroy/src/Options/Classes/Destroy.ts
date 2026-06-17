import { type IOptionLoader, type RecursivePartial, isNull } from "@tsparticles/engine";
import { DestroyBounds } from "./DestroyBounds.js";
import { DestroyMode } from "../../Enums/DestroyMode.js";
import { Explode } from "./Explode.js";
import type { IDestroy } from "../Interfaces/IDestroy.js";
import { Split } from "./Split.js";

/** Destroy options class */
export class Destroy implements IDestroy, IOptionLoader<IDestroy> {
  /** The destroy bounds */
  readonly bounds: DestroyBounds = new DestroyBounds();
  /** The explode options */
  readonly explode: Explode = new Explode();
  /** The destroy mode */
  mode: DestroyMode | keyof typeof DestroyMode = DestroyMode.none;
  /** The split options */
  readonly split: Split = new Split();
  /** Destroy constructor */

  /**
   * Loads the destroy options from data
   * @param data - The data to handle
   */
  load(data?: RecursivePartial<IDestroy>): void {
    if (isNull(data)) {
      return;
    }

    if (data.mode) {
      this.mode = data.mode;
    }

    if (data.bounds) {
      this.bounds.load(data.bounds);
    }

    this.explode.load(data.explode);

    this.split.load(data.split);
  }
}
