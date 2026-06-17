import type { IOutModes } from "../../../Interfaces/Particles/Move/IOutModes.js";
import { OptionLoader } from "../../../../Utils/OptionLoader.js";
import { OutMode } from "../../../../Enums/Modes/OutMode.js";
import type { RecursivePartial } from "../../../../Types/RecursivePartial.js";

/**
 * Out modes options class
 * [[include:Options/Particles/OutModes.md]]
 */
export class OutModes extends OptionLoader<IOutModes> implements IOutModes {
  /** Out mode for the bottom edge */
  bottom?: OutMode | keyof typeof OutMode;
  /** Default out mode used when per-edge modes are not set */
  default: OutMode | keyof typeof OutMode = OutMode.out;
  /** Out mode for the left edge */
  left?: OutMode | keyof typeof OutMode;
  /** Out mode for the right edge */
  right?: OutMode | keyof typeof OutMode;
  /** Out mode for the top edge */
  top?: OutMode | keyof typeof OutMode;

  /**
   * Loads out modes from the given data
   * @param data - The data to handle
   */
  protected doLoad(data: RecursivePartial<IOutModes>): void {
    if (data.default !== undefined) {
      this.default = data.default;
    }

    this.bottom = data.bottom ?? data.default;
    this.left = data.left ?? data.default;
    this.right = data.right ?? data.default;
    this.top = data.top ?? data.default;
  }
}
