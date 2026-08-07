import { OptionLoader, loadProperty } from "../../Utils/OptionsUtils.js";
import { HdrMode } from "../../Enums/Modes/HdrMode.js";
import type { IHDROptions } from "../Interfaces/IHDROptions.js";
import type { RecursivePartial } from "../../Types/RecursivePartial.js";

const defaultPeakNits = 400;

/**
 * HDR rendering options
 * [[include:Options/HDR.md]]
 */
export class HDROptions extends OptionLoader<IHDROptions> implements IHDROptions {
  enable = true;

  mode: HdrMode | keyof typeof HdrMode = HdrMode.standard;

  peakNits = defaultPeakNits;

  protected doLoad(data: RecursivePartial<IHDROptions>): void {
    loadProperty(this, "enable", data.enable);
    loadProperty(this, "mode", data.mode);
    loadProperty(this, "peakNits", data.peakNits);
  }
}
