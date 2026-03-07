import { type IOptionLoader, type RangeValue, type RecursivePartial, isNull, setRangeValue } from "@tsparticles/engine";
import type { ITrailColorComponent } from "../Interfaces/ITrailColorComponent.js";
import { TrailColorWeight } from "./TrailColorWeight.js";

export class TrailColorComponent implements ITrailColorComponent, IOptionLoader<ITrailColorComponent> {
  value?: RangeValue;
  weights?: TrailColorWeight;

  constructor() {
    this.weights = new TrailColorWeight();
  }

  load(data?: RecursivePartial<ITrailColorComponent>): void {
    if (!data) {
      return;
    }

    if (data.weights) {
      this.weights ??= new TrailColorWeight();

      this.weights.load(data.weights);
    }

    if (!isNull(data.value)) {
      this.value = setRangeValue(data.value);
    }
  }
}
