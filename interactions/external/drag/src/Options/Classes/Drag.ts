import { type IOptionLoader, type RecursivePartial, isNull, loadProperty } from "@tsparticles/engine";
import type { IDrag } from "../Interfaces/IDrag.js";

const defaultMomentumFactor = 0.03,
  defaultPreserveMomentum = false;

/** Options class for the drag interaction mode */
export class Drag implements IDrag, IOptionLoader<IDrag> {
  /** Momentum factor applied on drag release */
  momentumFactor;

  /** Whether to preserve drag momentum on release */
  preserveMomentum;

  constructor() {
    this.momentumFactor = defaultMomentumFactor;
    this.preserveMomentum = defaultPreserveMomentum;
  }

  /** @inheritDoc */
  load(data?: RecursivePartial<IDrag>): void {
    if (isNull(data)) {
      return;
    }

    loadProperty(this, "momentumFactor", data.momentumFactor);

    loadProperty(this, "preserveMomentum", data.preserveMomentum);
  }
}
