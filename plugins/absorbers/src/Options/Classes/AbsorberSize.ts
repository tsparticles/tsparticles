import {
  type IOptionLoader,
  type RecursivePartial,
  ValueWithRandom,
  isNull,
  isNumber,
  loadProperty,
} from "@tsparticles/engine";
import { AbsorberSizeLimit } from "./AbsorberSizeLimit.js";
import type { IAbsorberSize } from "../Interfaces/IAbsorberSize.js";

/**
 * The absorber size options
 */
export class AbsorberSize extends ValueWithRandom implements IAbsorberSize, IOptionLoader<IAbsorberSize> {
  /**
   * The absorber size density, affects the attraction force
   */
  density = 5;

  /**
   * The absorber size limit
   */
  readonly limit: AbsorberSizeLimit = new AbsorberSizeLimit();

  override value = 50;

  /**
   * Loads the absorber size options from the given data
   * @param data - the data to load from
   */
  override load(data?: RecursivePartial<IAbsorberSize>): void {
    if (isNull(data)) {
      return;
    }

    super.load(data);

    loadProperty(this, "density", data.density);

    if (isNumber(data.limit)) {
      this.limit.radius = data.limit;
    } else {
      this.limit.load(data.limit);
    }
  }
}
