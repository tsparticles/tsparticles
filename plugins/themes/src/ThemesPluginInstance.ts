import { type IContainerPlugin, manageListener, safeMatchMedia } from "@tsparticles/engine";
import type { ThemesContainer } from "./types.js";

export class ThemesPluginInstance implements IContainerPlugin {
  /** The themes container */
  readonly #container;

  /**
   * Creates a new ThemesPluginInstance
   * @param container - the themes container
   */
  constructor(container: ThemesContainer) {
    this.#container = container;
  }

  /** @inheritDoc */
  init(): Promise<void> {
    const container = this.#container;

    container.themeMatchMedia = safeMatchMedia("(prefers-color-scheme: dark)");

    const loadTheme = async (name?: string): Promise<void> => {
      if (container.destroyed) {
        return;
      }

      container.currentTheme = name;

      await container.refresh();
    };

    container.themeHandlers = {
      themeChange: (e): void => {
        this.#handleThemeChange(e);
      },
      oldThemeChange: (e): void => {
        this.#handleThemeChange(e);
      },
    };

    container.manageMediaMatch = (add: boolean): void => {
      const handlers = container.themeHandlers;

      if (!handlers) {
        return;
      }

      if (!container.themeMatchMedia) {
        return;
      }

      manageListener(container.themeMatchMedia, "change", handlers.themeChange, add);
    };

    container.loadTheme = loadTheme;

    return Promise.resolve();
  }

  /**
   * Manages theme media query listeners
   * @param add
   */
  manageListeners(add: boolean): void {
    const container = this.#container;

    container.manageMediaMatch?.(add);
  }

  /** @inheritDoc */
  async start(): Promise<void> {
    this.manageListeners(true);

    return Promise.resolve();
  }

  /** @inheritDoc */
  stop(): void {
    this.manageListeners(false);
  }

  /** @inheritDoc */
  updateActualOptions(): boolean {
    const container = this.#container;

    container.actualOptions.setTheme?.(container.currentTheme);

    return false;
  }

  /**
   * Handle browser theme change
   * @param e - the media query event
   * @internal
   */
  readonly #handleThemeChange = (e: Event): void => {
    const mediaEvent = e as MediaQueryListEvent,
      container = this.#container,
      options = container.options,
      defaultThemes = options.defaultThemes,
      themeName = mediaEvent.matches ? defaultThemes.dark : defaultThemes.light,
      theme = options.themes?.find(theme => theme.name === themeName);

    if (theme?.default.auto) {
      void container.loadTheme?.(themeName);
    }
  };
}
