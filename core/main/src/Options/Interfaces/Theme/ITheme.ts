import type { RecursivePartial } from "../../../Types";
import type { IOptions } from "../../../Interfaces/Options/IOptions";
import { IThemeDefault } from "./IThemeDefault";

/**
 * The options to configure themes that can be easily switched
 * [[include:Options/Themes.md]]
 * @category Options
 */
export interface ITheme {
    /**
     * Theme name, use it when changing theme
     */
    name: string;

    /**
     * Options to set the default theme
     */
    default: IThemeDefault;

    /**
     * All options the theme will override
     */
    options?: RecursivePartial<IOptions>;
}
