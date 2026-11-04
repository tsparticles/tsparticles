import {
  type IOptionLoader,
  type ISourceOptions,
  type RecursivePartial,
  deepExtend,
  isNull,
  loadProperty,
} from "@tsparticles/engine";
import type { ITheme } from "../Interfaces/ITheme.js";
import { ThemeDefault } from "./ThemeDefault.js";

const preserveElementReference = (source: unknown, destination: unknown): void => {
  if (typeof source !== "object" || source === null || typeof destination !== "object" || destination === null) {
    return;
  }

  const element = (source as { element?: unknown }).element;

  if (element !== undefined && typeof element !== "string") {
    (destination as { element?: unknown }).element = element;
  }
};

export class Theme implements ITheme, IOptionLoader<ITheme> {
  /** Options to set the default theme */
  readonly default = new ThemeDefault();
  /** Theme name, use it when changing theme */
  name = "";
  /** All options the theme will override */
  options?: ISourceOptions;

  load(data?: RecursivePartial<ITheme>): void {
    if (isNull(data)) {
      return;
    }

    loadProperty(this, "name", data.name);

    this.default.load(data.default);

    if (data.options !== undefined) {
      const options = deepExtend({}, data.options) as ISourceOptions,
        sourceBackgroundMask = data.options["backgroundMask"] as { cover?: unknown } | undefined,
        copiedBackgroundMask = options["backgroundMask"] as { cover?: unknown } | undefined;

      preserveElementReference(data.options.background, options.background);
      preserveElementReference(sourceBackgroundMask?.cover, copiedBackgroundMask?.cover);

      this.options = options;
    }
  }
}
