import { deepExtend, executeOnSingleOrMultiple, safeMatchMedia } from "../../Utils/Utils";
import { Background } from "./Background/Background";
import { BackgroundMask } from "./BackgroundMask/BackgroundMask";
import type { Container } from "../../Core/Container";
import type { Engine } from "../../engine";
import { FullScreen } from "./FullScreen/FullScreen";
import type { IOptionLoader } from "../Interfaces/IOptionLoader";
import type { IOptions } from "../Interfaces/IOptions";
import { Interactivity } from "./Interactivity/Interactivity";
import { ManualParticle } from "./ManualParticle";
import type { RangeValue } from "../../Types/RangeValue";
import type { RecursivePartial } from "../../Types/RecursivePartial";
import { Responsive } from "./Responsive";
import { ResponsiveMode } from "../../Enums/Modes/ResponsiveMode";
import type { SingleOrMultiple } from "../../Types/SingleOrMultiple";
import { Theme } from "./Theme/Theme";
import { ThemeMode } from "../../Enums/Modes/ThemeMode";
import { loadParticlesOptions } from "../../Utils/OptionsUtils";
import { setRangeValue } from "../../Utils/NumberUtils";

interface DefaultThemes {
    dark?: string;
    light?: string;
}

/**
 * [[include:Options.md]]
 * @category Options
 */
export class Options implements IOptions, IOptionLoader<IOptions> {
    [name: string]: unknown;

    autoPlay;
    background;
    backgroundMask;
    defaultThemes: DefaultThemes;
    delay: RangeValue;
    detectRetina;
    duration: RangeValue;
    fpsLimit;
    fullScreen;
    interactivity;
    manualParticles: ManualParticle[];
    particles;
    pauseOnBlur;
    pauseOnOutsideViewport;
    preset?: SingleOrMultiple<string>;
    responsive: Responsive[];
    smooth: boolean;
    style: RecursivePartial<CSSStyleDeclaration>;
    themes: Theme[];
    zLayers;

    private readonly _container;
    private readonly _engine;

    constructor(engine: Engine, container: Container) {
        this._engine = engine;
        this._container = container;
        this.autoPlay = true;
        this.background = new Background();
        this.backgroundMask = new BackgroundMask();
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
     * @deprecated this property is obsolete, please use the new fullScreen
     */
    get backgroundMode(): FullScreen {
        return this.fullScreen;
    }

    /**
     * @deprecated this property is obsolete, please use the new fullScreen
     * @param value
     */
    set backgroundMode(value: FullScreen) {
        this.fullScreen.load(value);
    }

    /**
     * @deprecated this property is obsolete, please use the new fpsLimit
     */
    get fps_limit(): number {
        return this.fpsLimit;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new fpsLimit
     * @param value
     */
    set fps_limit(value: number) {
        this.fpsLimit = value;
    }

    /**
     * @deprecated this property is obsolete, please use the new retinaDetect
     */
    get retina_detect(): boolean {
        return this.detectRetina;
    }

    /**
     * @deprecated this property is obsolete, please use the new retinaDetect
     * @param value
     */
    set retina_detect(value: boolean) {
        this.detectRetina = value;
    }

    /**
     * This methods loads the source object in the current instance
     * @param data the source data to load into the instance
     */
    load(data?: RecursivePartial<IOptions>): void {
        if (!data) {
            return;
        }

        if (data.preset !== undefined) {
            executeOnSingleOrMultiple(data.preset, (preset) => this._importPreset(preset));
        }

        if (data.autoPlay !== undefined) {
            this.autoPlay = data.autoPlay;
        }

        if (data.delay !== undefined) {
            this.delay = setRangeValue(data.delay);
        }

        const detectRetina = data.detectRetina ?? data.retina_detect;

        if (detectRetina !== undefined) {
            this.detectRetina = detectRetina;
        }

        if (data.duration !== undefined) {
            this.duration = setRangeValue(data.duration);
        }

        const fpsLimit = data.fpsLimit ?? data.fps_limit;

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

        const fullScreen = data.fullScreen ?? data.backgroundMode;

        if (typeof fullScreen === "boolean") {
            this.fullScreen.enable = fullScreen;
        } else {
            this.fullScreen.load(fullScreen);
        }

        this.backgroundMask.load(data.backgroundMask);
        this.interactivity.load(data.interactivity);

        if (data.manualParticles !== undefined) {
            this.manualParticles = data.manualParticles.map((t) => {
                const tmp = new ManualParticle();

                tmp.load(t);

                return tmp;
            });
        }

        this.particles.load(data.particles);
        this.style = deepExtend(this.style, data.style) as RecursivePartial<CSSStyleDeclaration>;
        this._engine.plugins.loadOptions(this, data);

        if (data.smooth !== undefined) {
            this.smooth = data.smooth;
        }

        const interactors = this._engine.plugins.interactors.get(this._container);

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
                const existingTheme = this.themes.find((t) => t.name === theme.name);

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

        const responsiveOptions = this.responsive.find((t) =>
            t.mode === ResponsiveMode.screen && screen ? t.maxWidth > screen.availWidth : t.maxWidth * pxRatio > width
        );

        this.load(responsiveOptions?.options);

        return responsiveOptions?.maxWidth;
    }

    setTheme(name?: string): void {
        if (name) {
            const chosenTheme = this.themes.find((theme) => theme.name === name);

            if (chosenTheme) {
                this.load(chosenTheme.options);
            }
        } else {
            const mediaMatch = safeMatchMedia("(prefers-color-scheme: dark)"),
                clientDarkMode = mediaMatch && mediaMatch.matches,
                defaultTheme = this._findDefaultTheme(clientDarkMode ? ThemeMode.dark : ThemeMode.light);

            if (defaultTheme) {
                this.load(defaultTheme.options);
            }
        }
    }

    private _findDefaultTheme(mode: ThemeMode): Theme | undefined {
        return (
            this.themes.find((theme) => theme.default.value && theme.default.mode === mode) ??
            this.themes.find((theme) => theme.default.value && theme.default.mode === ThemeMode.any)
        );
    }

    private _importPreset(preset: string): void {
        this.load(this._engine.plugins.getPreset(preset));
    }
}
