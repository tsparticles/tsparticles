import type { ThemeMode } from "../../../Enums/Modes/ThemeMode";

/**
 * Options to set the default theme
 */
export interface IThemeDefault {
    /**
     * If set to true, this theme will be switched when the mode matches the user OS theme
     */
    auto: boolean;

    /**
     * Default theme mode
     * `any`: Sets the default theme for every configuration
     * `dark`: Sets the default theme when the user has dark mode set
     * `light`: Sets the default theme when the user has light mode set
     * If `dark` or `light` themes are set, the `any` default theme will be used only for unset modes
     */
    mode: ThemeMode | keyof ThemeMode;

    /**
     * Sets or unsets the default flag to this theme and mode
     */
    value: boolean;
}
