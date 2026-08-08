import { OptionLoader, loadProperty } from "../../Utils/OptionsUtils.js";
import { isBoolean, isNumber } from "../../Utils/TypeUtils.js";
import { HdrMode } from "../../Enums/Modes/HdrMode.js";
import type { IHDROptions } from "../Interfaces/IHDROptions.js";
import type { RecursivePartial } from "../../Types/RecursivePartial.js";

const defaultPeakNits = 400,
  minPeakNits = 0,
  /**
   * Converts a value to a string for error messages without throwing on symbols.
   * @param value - The value to convert
   * @returns The string representation of the value
   */
  toStringValue = (value: unknown): string => String(value);

/**
 * HDR rendering options
 * [[include:Options/HDR.md]]
 */
export class HDROptions extends OptionLoader<IHDROptions> implements IHDROptions {
  enable = true;

  mode: HdrMode | keyof typeof HdrMode = HdrMode.standard;

  peakNits = defaultPeakNits;

  protected doLoad(data: RecursivePartial<IHDROptions>): void {
    if (data.enable !== undefined && !isBoolean(data.enable)) {
      throw new Error(`Invalid HDR "enable" value: expected a boolean, got "${String(data.enable)}"`);
    }

    if (
      data.mode !== undefined &&
      (typeof data.mode !== "string" || !Object.values(HdrMode).includes(data.mode as HdrMode))
    ) {
      throw new Error(
        `Invalid HDR "mode" value: expected one of ${Object.values(HdrMode).join(", ")}, got "${toStringValue(data.mode)}"`,
      );
    }

    if (
      data.peakNits !== undefined &&
      (!isNumber(data.peakNits) || !Number.isFinite(data.peakNits) || data.peakNits <= minPeakNits)
    ) {
      throw new Error(`Invalid HDR "peakNits" value: expected a positive number, got "${String(data.peakNits)}"`);
    }

    loadProperty(this, "enable", data.enable);
    loadProperty(this, "mode", data.mode);
    loadProperty(this, "peakNits", data.peakNits);
  }
}
