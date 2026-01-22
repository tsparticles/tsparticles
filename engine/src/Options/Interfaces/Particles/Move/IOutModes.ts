import type { OutMode } from "../../../../Enums/Modes/OutMode.js";

export interface IOutModes {
  bottom?: OutMode | keyof typeof OutMode;
  default: OutMode | keyof typeof OutMode;
  left?: OutMode | keyof typeof OutMode;
  right?: OutMode | keyof typeof OutMode;
  top?: OutMode | keyof typeof OutMode;
}
