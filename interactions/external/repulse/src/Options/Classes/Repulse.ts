import {
  type IOptionLoader,
  type RecursivePartial,
  type SingleOrMultiple,
  executeOnSingleOrMultiple,
  isNull,
} from "@tsparticles/engine";
import type { IRepulse } from "../Interfaces/IRepulse.js";
import { RepulseBase } from "./RepulseBase.js";
import { RepulseDiv } from "./RepulseDiv.js";

/** Repulse mode options class */
export class Repulse extends RepulseBase implements IRepulse, IOptionLoader<IRepulse> {
  /** Repulse divs to apply the mode to */
  divs?: SingleOrMultiple<RepulseDiv>;

  /** @inheritDoc */
  override load(data?: RecursivePartial<IRepulse>): void {
    super.load(data);

    if (isNull(data)) {
      return;
    }

    this.divs = executeOnSingleOrMultiple(data.divs, div => {
      const tmp = new RepulseDiv();

      tmp.load(div);

      return tmp;
    });
  }
}
