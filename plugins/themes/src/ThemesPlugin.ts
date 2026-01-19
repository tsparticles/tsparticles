import {
    type Container,
    type IContainerPlugin,
    type IPlugin,
    type RecursivePartial,
    safeMatchMedia,
} from "@tsparticles/engine";
import type { IThemesOptions, ThemesContainer, ThemesOptions } from "./types.js";
import { Theme } from "./Options/Classes/Theme.js";
import { ThemeMode } from "./ThemeMode.js";

/**
 */
export class ThemesPlugin implements IPlugin {
    readonly id;

    constructor() {
        this.id = "theme";
    }

    async getPlugin(container: ThemesContainer): Promise<IContainerPlugin> {
        const { ThemesPluginInstance } = await import("./ThemesPluginInstance.js");

        return new ThemesPluginInstance(container);
    }

    loadOptions(_container: Container, options: ThemesOptions, source?: RecursivePartial<IThemesOptions>): void {
        if (!this.needsPlugin(source)) {
            return;
        }

        const findDefaultTheme = (mode: ThemeMode): Theme | undefined => {
                if (!options.themes) {
                    return;
                }

                return (
                    options.themes.find(theme => theme.default.value && theme.default.mode === mode) ??
                    options.themes.find(theme => theme.default.value && theme.default.mode === ThemeMode.any)
                );
            },
            setTheme = (name?: string): void => {
                if (!options.themes) {
                    return;
                }

                if (name) {
                    const chosenTheme = options.themes.find(theme => theme.name === name);

                    if (chosenTheme) {
                        options.load(chosenTheme.options);
                    }
                } else {
                    const mediaMatch = safeMatchMedia("(prefers-color-scheme: dark)"),
                        clientDarkMode = mediaMatch?.matches,
                        defaultTheme = findDefaultTheme(clientDarkMode ? ThemeMode.dark : ThemeMode.light);

                    if (defaultTheme) {
                        options.load(defaultTheme.options);
                    }
                }
            };

        options.findDefaultTheme = findDefaultTheme;
        options.setTheme = setTheme;
        options.themes ??= [];

        if (source?.themes !== undefined) {
            for (const theme of source.themes) {
                if (!theme) {
                    continue;
                }

                const existingTheme = options.themes.find(t => t.name === theme.name);

                if (existingTheme) {
                    existingTheme.load(theme);
                } else {
                    const optTheme = new Theme();

                    optTheme.load(theme);

                    options.themes.push(optTheme);
                }
            }
        }

        options.defaultThemes.dark = findDefaultTheme(ThemeMode.dark)?.name;
        options.defaultThemes.light = findDefaultTheme(ThemeMode.light)?.name;
    }

    needsPlugin(options?: RecursivePartial<IThemesOptions>): boolean {
        return !!options?.themes?.length;
    }
}
