import type { IColor, IRangeColor, IRgb, IRgba } from "./Colors.js";

export interface IColorManager {
  accepts(input: string): boolean;

  handleColor(color: IColor): IRgb | undefined;

  handleRangeColor(color: IRangeColor): IRgb | undefined;

  parseString(input: string): IRgba | undefined;
}
