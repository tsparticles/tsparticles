import {
  type IOptionLoader,
  OptionsColor,
  type RecursivePartial,
  type SingleOrMultiple,
  executeOnSingleOrMultiple,
  isArray,
  isNull,
  loadProperty,
  loadRangeProperty,
} from "@tsparticles/engine";
import type { IBubbleBase } from "../Interfaces/IBubbleBase.js";

/** Bubble base options class */
export abstract class BubbleBase implements IBubbleBase, IOptionLoader<IBubbleBase> {
  /** Bubble color */
  color?: SingleOrMultiple<OptionsColor>;

  /** Bubble distance in pixels */
  distance;

  /** Bubble animation duration in seconds */
  duration;

  /** Whether to mix the bubble color with the particle color */
  mix;

  /** Bubble opacity */
  opacity?: number;

  /** Bubble size */
  size?: number;

  /** @inheritDoc */
  constructor() {
    this.distance = 200;
    this.duration = 0.4;
    this.mix = false;
  }

  /** @inheritDoc */
  load(data?: RecursivePartial<IBubbleBase>): void {
    if (isNull(data)) {
      return;
    }

    loadProperty(this, "distance", data.distance);
    loadProperty(this, "duration", data.duration);
    loadProperty(this, "mix", data.mix);
    loadRangeProperty(this, "opacity", data.opacity);

    if (data.color !== undefined) {
      const sourceColor = isArray(this.color) ? undefined : this.color;

      this.color = executeOnSingleOrMultiple(data.color, color => {
        return OptionsColor.create(sourceColor, color);
      });
    }

    loadProperty(this, "size", data.size);
  }
}
