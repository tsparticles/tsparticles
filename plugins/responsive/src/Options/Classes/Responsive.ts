import {
  type IOptionLoader,
  type ISourceOptions,
  type RecursivePartial,
  deepExtend,
  isNull,
} from "@tsparticles/engine";
import type { IResponsive } from "../Interfaces/IResponsive.js";
import { ResponsiveMode } from "../../ResponsiveMode.js";

const preserveElementReference = (source: unknown, destination: unknown): void => {
  if (typeof source !== "object" || source === null || typeof destination !== "object" || destination === null) {
    return;
  }

  const element = (source as { element?: unknown }).element;

  if (element !== undefined && typeof element !== "string") {
    (destination as { element?: unknown }).element = element;
  }
};

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
      const options = deepExtend({}, data.options) as ISourceOptions,
        sourceBackgroundMask = data.options["backgroundMask"] as { cover?: unknown } | undefined,
        copiedBackgroundMask = options["backgroundMask"] as { cover?: unknown } | undefined;

      preserveElementReference(data.options.background, options.background);
      preserveElementReference(sourceBackgroundMask?.cover, copiedBackgroundMask?.cover);

      this.options = options;
    }
  }
}
