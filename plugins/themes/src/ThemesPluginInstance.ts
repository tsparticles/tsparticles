import { type IContainerPlugin, manageListener, safeMatchMedia } from "@tsparticles/engine";
import type { ThemesContainer } from "./types.js";

export class ThemesPluginInstance implements IContainerPlugin {
    private readonly _container;

    constructor(container: ThemesContainer) {
        this._container = container;
    }

    async init(): Promise<void> {
        const container = this._container;

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
                this._handleThemeChange(e);
            },
            oldThemeChange: (e): void => {
                this._handleThemeChange(e);
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

        await Promise.resolve();
    }

    manageListeners(add: boolean): void {
        const container = this._container;

        container.manageMediaMatch?.(add);
    }

    async start(): Promise<void> {
        this.manageListeners(true);

        await Promise.resolve();
    }

    stop(): void {
        this.manageListeners(false);
    }

    updateActualOptions(): boolean {
        const container = this._container;

        container.actualOptions.setTheme?.(container.currentTheme);

        return false;
    }

    /**
     * Handle browser theme change
     * @param e - the media query event
     * @internal
     */
    private readonly _handleThemeChange = (e: Event): void => {
        const mediaEvent = e as MediaQueryListEvent,
            container = this._container,
            options = container.options,
            defaultThemes = options.defaultThemes,
            themeName = mediaEvent.matches ? defaultThemes.dark : defaultThemes.light,
            theme = options.themes?.find(theme => theme.name === themeName);

        if (theme?.default.auto) {
            void container.loadTheme?.(themeName);
        }
    };
}
