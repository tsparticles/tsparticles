import { type IValueWithRandom, type RecursivePartial, ValueWithRandom, isNull } from "@tsparticles/engine";

/** Orbit rotation options class */
export class OrbitRotation extends ValueWithRandom {
  /** OrbitRotation constructor */
  constructor() {
    super();

    this.value = 45;
  }

  /**
   * Loads the orbit rotation from data
   * @param data
   */
  override load(data?: RecursivePartial<IValueWithRandom>): void {
    if (isNull(data)) {
      return;
    }

    super.load(data);
  }
}
