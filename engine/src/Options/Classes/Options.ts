import { deepExtend, executeOnSingleOrMultiple, safeMatchMedia } from "../../Utils/Utils.js";
import { Background } from "./Background/Background.js";
import { BackgroundMask } from "./BackgroundMask/BackgroundMask.js";
import type { Container } from "../../Core/Container.js";
import type { Engine } from "../../Core/Engine.js";
import { FullScreen } from "./FullScreen/FullScreen.js";
import type { IOptionLoader } from "../Interfaces/IOptionLoader.js";
import type { IOptions } from "../Interfaces/IOptions.js";
import { Interactivity } from "./Interactivity/Interactivity.js";
import { ManualParticle } from "./ManualParticle.js";
import type { RangeValue } from "../../Types/RangeValue.js";
import type { RecursivePartial } from "../../Types/RecursivePartial.js";
import { Responsive } from "./Responsive.js";
import { ResponsiveMode } from "../../Enums/Modes/ResponsiveMode.js";
import type { SingleOrMultiple } from "../../Types/SingleOrMultiple.js";
import { Theme } from "./Theme/Theme.js";
import { ThemeMode } from "../../Enums/Modes/ThemeMode.js";
import { isBoolean } from "../../Utils/TypeUtils.js";
import { loadParticlesOptions } from "../../Utils/OptionsUtils.js";
import { setRangeValue } from "../../Utils/NumberUtils.js";

interface DefaultThemes {
    dark?: string;
    light?: string;
}

/**
 * [[include:Options.md]]
 */
export class Options implements IOptions, IOptionLoader<IOptions> {
    [name: string]: unknown;

    autoPlay;
    readonly background;
    readonly backgroundMask;
    clear: boolean;
    defaultThemes: DefaultThemes;
    delay: RangeValue;
    detectRetina;
    duration: RangeValue;
    fpsLimit;
    readonly fullScreen;
    readonly interactivity;
    key?: string;
    manualParticles: ManualParticle[];
    name?: string;
    readonly particles;
    pauseOnBlur;
    pauseOnOutsideViewport;
    preset?: SingleOrMultiple<string>;
    responsive: Responsive[];
    smooth: boolean;
    style: RecursivePartial<CSSStyleDeclaration>;
    readonly themes: Theme[];
    zLayers;

    private readonly _container;
    private readonly _engine;

    constructor(engine: Engine, container: Container) {
        this._engine = engine;
        this._container = container;
        this.autoPlay = true;
        this.background = new Background();
        this.backgroundMask = new BackgroundMask();
        this.clear = true;
        this.defaultThemes = {};
        this.delay = 0;
        this.fullScreen = new FullScreen();
        this.detectRetina = true;
        this.duration = 0;
        this.fpsLimit = 120;
        this.interactivity = new Interactivity(engine, container);
        this.manualParticles = [];
        this.particles = loadParticlesOptions(this._engine, this._container);
        this.pauseOnBlur = true;
        this.pauseOnOutsideViewport = true;
        this.responsive = [];
        this.smooth = false;
        this.style = {};
        this.themes = [];
        this.zLayers = 100;
    }

    /**
     * This method loads the source object in the current instance
     * @param data - the source data to load into the instance
     */
    load(data?: RecursivePartial<IOptions>): void {
        if (!data) {
            return;
        }

        if (data.preset !== undefined) {
            executeOnSingleOrMultiple(data.preset, preset => this._importPreset(preset));
        }

        if (data.autoPlay !== undefined) {
            this.autoPlay = data.autoPlay;
        }

        if (data.clear !== undefined) {
            this.clear = data.clear;
        }

        if (data.key !== undefined) {
            this.key = data.key;
        }

        if (data.name !== undefined) {
            this.name = data.name;
        }

        if (data.delay !== undefined) {
            this.delay = setRangeValue(data.delay);
        }

        const detectRetina = data.detectRetina;

        if (detectRetina !== undefined) {
            this.detectRetina = detectRetina;
        }

        if (data.duration !== undefined) {
            this.duration = setRangeValue(data.duration);
        }

        const fpsLimit = data.fpsLimit;

        if (fpsLimit !== undefined) {
            this.fpsLimit = fpsLimit;
        }

        if (data.pauseOnBlur !== undefined) {
            this.pauseOnBlur = data.pauseOnBlur;
        }

        if (data.pauseOnOutsideViewport !== undefined) {
            this.pauseOnOutsideViewport = data.pauseOnOutsideViewport;
        }

        if (data.zLayers !== undefined) {
            this.zLayers = data.zLayers;
        }

        this.background.load(data.background);

        const fullScreen = data.fullScreen;

        if (isBoolean(fullScreen)) {
            this.fullScreen.enable = fullScreen;
        } else {
            this.fullScreen.load(fullScreen);
        }

        this.backgroundMask.load(data.backgroundMask);
        this.interactivity.load(data.interactivity);

        if (data.manualParticles) {
            this.manualParticles = data.manualParticles.map(t => {
                const tmp = new ManualParticle();

                tmp.load(t);

                return tmp;
            });
        }

        this.particles.load(data.particles);
        this.style = deepExtend(this.style, data.style) as RecursivePartial<CSSStyleDeclaration>;
        this._engine.loadOptions(this, data);

        if (data.smooth !== undefined) {
            this.smooth = data.smooth;
        }

        const interactors = this._engine.interactors.get(this._container);

        if (interactors) {
            for (const interactor of interactors) {
                if (interactor.loadOptions) {
                    interactor.loadOptions(this, data);
                }
            }
        }

        if (data.responsive !== undefined) {
            for (const responsive of data.responsive) {
                const optResponsive = new Responsive();

                optResponsive.load(responsive);

                this.responsive.push(optResponsive);
            }
        }

        this.responsive.sort((a, b) => a.maxWidth - b.maxWidth);

        if (data.themes !== undefined) {
            for (const theme of data.themes) {
                const existingTheme = this.themes.find(t => t.name === theme.name);

                if (!existingTheme) {
                    const optTheme = new Theme();

                    optTheme.load(theme);

                    this.themes.push(optTheme);
                } else {
                    existingTheme.load(theme);
                }
            }
        }

        this.defaultThemes.dark = this._findDefaultTheme(ThemeMode.dark)?.name;
        this.defaultThemes.light = this._findDefaultTheme(ThemeMode.light)?.name;
    }

    setResponsive(width: number, pxRatio: number, defaultOptions: IOptions): number | undefined {
        this.load(defaultOptions);

        const responsiveOptions = this.responsive.find(t =>
            t.mode === ResponsiveMode.screen && screen ? t.maxWidth > screen.availWidth : t.maxWidth * pxRatio > width,
        );

        this.load(responsiveOptions?.options);

        return responsiveOptions?.maxWidth;
    }

    setTheme(name?: string): void {
        if (name) {
            const chosenTheme = this.themes.find(theme => theme.name === name);

            if (chosenTheme) {
                this.load(chosenTheme.options);
            }
        } else {
            const mediaMatch = safeMatchMedia("(prefers-color-scheme: dark)"),
                clientDarkMode = mediaMatch?.matches,
                defaultTheme = this._findDefaultTheme(clientDarkMode ? ThemeMode.dark : ThemeMode.light);

            if (defaultTheme) {
                this.load(defaultTheme.options);
            }
        }
    }

    private readonly _findDefaultTheme: (mode: ThemeMode) => Theme | undefined = mode => {
        return (
            this.themes.find(theme => theme.default.value && theme.default.mode === mode) ??
            this.themes.find(theme => theme.default.value && theme.default.mode === ThemeMode.any)
        );
    };

    private readonly _importPreset: (preset: string) => void = preset => {
        this.load(this._engine.getPreset(preset));
    };
}
