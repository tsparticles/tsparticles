import {
  type IOptionLoader,
  type ISourceOptions,
  type RecursivePartial,
  deepExtend,
  isNull,
} from "@tsparticles/engine";
import type { IResponsive } from "../Interfaces/IResponsive.js";
import { ResponsiveMode } from "../../ResponsiveMode.js";

export class Responsive implements IResponsive, IOptionLoader<IResponsive> {
  maxWidth: number;
  mode: ResponsiveMode | keyof typeof ResponsiveMode;
  options: ISourceOptions;

  constructor() {
    this.maxWidth = Infinity;
    this.options = {};
    this.mode = ResponsiveMode.canvas;
  }

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
