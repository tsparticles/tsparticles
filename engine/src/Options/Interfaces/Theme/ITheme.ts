import type { IOptions } from "../IOptions";
import type { IThemeDefault } from "./IThemeDefault";
import type { RecursivePartial } from "../../../Types/RecursivePartial";

/**
 * The options to configure themes that can be easily switched
 * [[include:Options/Themes.md]]
 *
 
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
    options?: RecursivePartial<IOptions>;
}
