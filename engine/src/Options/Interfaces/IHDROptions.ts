import type { HdrMode } from "../../Enums/Modes/HdrMode.js";

export interface IHDROptions {
  /** Whether HDR rendering is enabled */
  enable: boolean;
  /** The HDR rendering mode preset, e.g. HdrMode.standard or HdrMode.vivid */
  mode: HdrMode | keyof typeof HdrMode;
  /** The peak brightness in nits for HDR rendering */
  peakNits: number;
}
