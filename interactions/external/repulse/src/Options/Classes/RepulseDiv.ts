import {
  type IOptionLoader,
  type RecursivePartial,
  type SingleOrMultiple,
  isNull,
  loadProperty,
} from "@tsparticles/engine";
import type { IRepulseDiv } from "../Interfaces/IRepulseDiv.js";
import { RepulseBase } from "./RepulseBase.js";

/** Repulse mode div options class */
export class RepulseDiv extends RepulseBase implements IRepulseDiv, IOptionLoader<IRepulseDiv> {
  /** CSS selectors for div elements to apply repulse to */
  selectors: SingleOrMultiple<string> = [];

  /** @inheritDoc */
  override load(data?: RecursivePartial<IRepulseDiv>): void {
    super.load(data);

    if (isNull(data)) {
      return;
    }

    loadProperty(this, "selectors", data.selectors);
  }
}
