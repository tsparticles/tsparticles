import {
  type IOptionLoader,
  type ISourceOptions,
  type RecursivePartial,
  deepExtend,
  isNull,
} from "@tsparticles/engine";
import type { IResponsive } from "../Interfaces/IResponsive.js";
import { ResponsiveMode } from "../../ResponsiveMode.js";

/**
 * Responsive options class
 * [[include:Options/Plugins/Responsive.md]]
 */
export class Responsive implements IResponsive, IOptionLoader<IResponsive> {
  maxWidth = Infinity;
  mode: ResponsiveMode | keyof typeof ResponsiveMode = ResponsiveMode.canvas;
  options: ISourceOptions = {};

  load(data?: RecursivePartial<IResponsive>): void {
    if (isNull(data)) {
      return;
    }

    if (!isNull(data.maxWidth)) {
      this.maxWidth = data.maxWidth;
    }

    if (!isNull(data.mode)) {
      // not enforcing an error here as this should largely be an opt-in setting
      if (data.mode === ResponsiveMode.screen) {
        this.mode = ResponsiveMode.screen;
      } else {
        this.mode = ResponsiveMode.canvas;
      }
    }

    if (!isNull(data.options)) {
      this.options = deepExtend({}, data.options) as ISourceOptions;
    }
  }
}
