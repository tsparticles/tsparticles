import type { ISourceOptions } from "@tsparticles/engine";
import type { IThemeDefault } from "./IThemeDefault.js";

/**
 * The options to configure themes that can be easily switched
 * [[include:Options/Themes.md]]
 */
export interface ITheme {
  /**
   * Options to set the default theme
   */
  default: IThemeDefault;

  /**
   * Theme name, use it when changing theme
   */
  name: string;

  /**
   * All options the theme will override
   */
  options?: ISourceOptions;
}
