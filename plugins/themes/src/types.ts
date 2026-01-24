import type { Container, IOptions, Options } from "@tsparticles/engine";
import type { ITheme } from "./Options/Interfaces/ITheme.js";
import type { Theme } from "./Options/Classes/Theme.js";
import type { ThemeMode } from "./ThemeMode.js";

export type IThemesOptions = IOptions & {
  themes?: ITheme[];
};

export type ThemesOptions = Options & {
  findDefaultTheme?: (mode: ThemeMode) => Theme | undefined;
  setTheme?: (name?: string) => void;
  themes?: Theme[];
};

export interface ThemeEventListenersHandlers {
  readonly oldThemeChange: (this: MediaQueryList, ev: MediaQueryListEvent) => unknown;
  readonly themeChange: EventListenerOrEventListenerObject;
}

export type ThemesContainer = Container & {
  actualOptions: ThemesOptions;
  currentTheme?: string;
  loadTheme?: (name?: string) => Promise<void>;
  manageMediaMatch?: (add: boolean) => void;
  options: ThemesOptions;
  themeHandlers?: ThemeEventListenersHandlers;
  themeMatchMedia?: MediaQueryList;
  themesMaxWidth?: number;
};
