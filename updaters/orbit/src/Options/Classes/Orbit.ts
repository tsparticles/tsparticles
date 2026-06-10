import {
  AnimationOptions,
  type IAnimatable,
  type IOptionLoader,
  OptionsColor,
  type RangeValue,
  type RecursivePartial,
  isNull,
  loadProperty,
  loadRangeProperty,
} from "@tsparticles/engine";
import type { IOrbit } from "../Interfaces/IOrbit.js";
import { OrbitRotation } from "./OrbitRotation.js";

/**
 * [[include:Options/Particles/Orbit.md]]
 */
export class Orbit implements IOrbit, IOptionLoader<IOrbit>, IAnimatable<AnimationOptions> {
  /** Orbit animation options */
  animation;
  /** Orbit color */
  color?: OptionsColor;
  /** Enables the orbit */
  enable: boolean;
  /** Orbit opacity */
  opacity: RangeValue;
  /** Orbit radius */
  radius?: RangeValue;
  /** Orbit rotation */
  rotation;
  /** Orbit width */
  width: RangeValue;

  /** Orbit constructor */
  constructor() {
    this.animation = new AnimationOptions();
    this.enable = false;
    this.opacity = 1;
    this.rotation = new OrbitRotation();
    this.width = 1;
  }

  /**
   * Loads the orbit options from data
   * @param data
   */
  load(data?: RecursivePartial<IOrbit>): void {
    if (isNull(data)) {
      return;
    }

    this.animation.load(data.animation);

    this.rotation.load(data.rotation);

    loadProperty(this, "enable", data.enable);
    loadRangeProperty(this, "opacity", data.opacity);
    loadRangeProperty(this, "width", data.width);
    loadRangeProperty(this, "radius", data.radius);
    if (data.color !== undefined) {
      this.color = OptionsColor.create(this.color, data.color);
    }
  }
}
