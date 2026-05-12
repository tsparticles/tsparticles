import type { Container, IOptions, Options } from "@tsparticles/engine";
import type { ITheme } from "./Options/Interfaces/ITheme.js";
import type { Theme } from "./Options/Classes/Theme.js";
import type { ThemeMode } from "./ThemeMode.js";

/** Themes plugin options interface */
export type IThemesOptions = IOptions & {
  /** The theme configurations */
  themes?: ITheme[];
};

/** Themes plugin options class */
export type ThemesOptions = Options & {
  /** Finds the default theme for the given mode */
  findDefaultTheme?: (mode: ThemeMode) => Theme | undefined;
  /** Sets the active theme by name */
  setTheme?: (name?: string) => void;
  /** The array of theme configurations */
  themes?: Theme[];
};

/** Theme event listeners handlers */
export interface ThemeEventListenersHandlers {
  /** Handler for the old-style theme change event */
  readonly oldThemeChange: (this: MediaQueryList, ev: MediaQueryListEvent) => unknown;
  /** Handler for the theme change event */
  readonly themeChange: EventListenerOrEventListenerObject;
}

/** Container with theme capabilities */
export type ThemesContainer = Container & {
  /** The actual theme options */
  actualOptions: ThemesOptions;
  /** The currently active theme name */
  currentTheme?: string;
  /** Loads a theme by name */
  loadTheme?: (name?: string) => Promise<void>;
  /** Manages media query listeners */
  manageMediaMatch?: (add: boolean) => void;
  /** The theme options */
  options: ThemesOptions;
  /** The theme change event handlers */
  themeHandlers?: ThemeEventListenersHandlers;
  /** The media query list for dark mode detection */
  themeMatchMedia?: MediaQueryList;
  /** The maximum width for responsive theme */
  themesMaxWidth?: number;
};
