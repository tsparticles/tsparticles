import {
  type IOptionLoader,
  type ISourceOptions,
  type RecursivePartial,
  deepExtend,
  isNull,
} from "@tsparticles/engine";
import type { ITheme } from "../Interfaces/ITheme.js";
import { ThemeDefault } from "./ThemeDefault.js";

export class Theme implements ITheme, IOptionLoader<ITheme> {
  /** Options to set the default theme */
  readonly default;
  /** Theme name, use it when changing theme */
  name;
  /** All options the theme will override */
  options?: ISourceOptions;

  constructor() {
    this.name = "";
    this.default = new ThemeDefault();
  }

  load(data?: RecursivePartial<ITheme>): void {
    if (isNull(data)) {
      return;
    }

    if (data.name !== undefined) {
      this.name = data.name;
    }

    this.default.load(data.default);

    if (data.options !== undefined) {
      this.options = deepExtend({}, data.options) as ISourceOptions;
    }
  }
}
