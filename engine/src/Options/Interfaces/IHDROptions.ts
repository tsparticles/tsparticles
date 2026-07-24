import type { HdrMode } from "../../Enums/Modes/HdrMode.js";

export interface IHDROptions {
  enable: boolean;
  mode: HdrMode | keyof typeof HdrMode;
  peakNits: number;
}
