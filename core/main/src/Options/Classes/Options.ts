import type { IOptions } from "../Interfaces/IOptions";
import { Interactivity } from "./Interactivity/Interactivity";
import { Particles } from "./Particles/Particles";
import { BackgroundMask } from "./BackgroundMask/BackgroundMask";
import type { RecursivePartial } from "../../Types";
import { Background } from "./Background/Background";
import { Infection } from "./Infection/Infection";
import { Plugins } from "../../Utils";
import type { IOptionLoader } from "../Interfaces/IOptionLoader";
import { Theme } from "./Theme/Theme";
import { ThemeMode } from "../../Enums/Modes";
import { FullScreen } from "./FullScreen/FullScreen";
import { Motion } from "./Motion/Motion";
import { ManualParticle } from "./ManualParticle";
import { Responsive } from "./Responsive";

/**
 * [[include:Options.md]]
 * @category Options
 */
export class Options implements IOptions, IOptionLoader<IOptions> {
    /**
     * @deprecated this property is obsolete, please use the new fpsLimit
     */
    public get fps_limit(): number {
        return this.fpsLimit;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new fpsLimit
     * @param value
     */
    public set fps_limit(value: number) {
        this.fpsLimit = value;
    }

    /**
     * @deprecated this property is obsolete, please use the new retinaDetect
     */
    public get retina_detect(): boolean {
        return this.detectRetina;
    }

    /**
     * @deprecated this property is obsolete, please use the new retinaDetect
     * @param value
     */
    public set retina_detect(value: boolean) {
        this.detectRetina = value;
    }

    /**
     * @deprecated this property is obsolete, please use the new fullScreen
     */
    public get backgroundMode(): FullScreen {
        return this.fullScreen;
    }

    /**
     * @deprecated this property is obsolete, please use the new fullScreen
     * @param value
     */
    public set backgroundMode(value: FullScreen) {
        this.fullScreen.load(value);
    }

    public autoPlay;
    public background;
    public backgroundMask;
    public detectRetina;
    public fpsLimit;
    public fullScreen;
    public infection;
    public interactivity;
    public manualParticles: ManualParticle[];
    public motion;
    public particles;
    public pauseOnBlur;
    public pauseOnOutsideViewport;
    public preset?: string | string[];
    public responsive: Responsive[];
    public themes: Theme[];

    [name: string]: unknown;

    constructor() {
        this.autoPlay = true;
        this.background = new Background();
        this.backgroundMask = new BackgroundMask();
        this.fullScreen = new FullScreen();
        this.detectRetina = true;
        this.fpsLimit = 60;
        this.infection = new Infection();
        this.interactivity = new Interactivity();
        this.manualParticles = [];
        this.motion = new Motion();
        this.particles = new Particles();
        this.pauseOnBlur = true;
        this.pauseOnOutsideViewport = true;
        this.responsive = [];
        this.themes = [];
    }

    /**
     * This methods loads the source object in the current instance
     * @param data the source data to load into the instance
     */
    public load(data?: RecursivePartial<IOptions>): void {
        if (data === undefined) {
            return;
        }

        if (data.preset !== undefined) {
            if (data.preset instanceof Array) {
                for (const preset of data.preset) {
                    this.importPreset(preset);
                }
            } else {
                this.importPreset(data.preset);
            }
        }

        if (data.autoPlay !== undefined) {
            this.autoPlay = data.autoPlay;
        }

        const detectRetina = data.detectRetina ?? data.retina_detect;

        if (detectRetina !== undefined) {
            this.detectRetina = detectRetina;
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

        this.background.load(data.background);
        this.fullScreen.load(data.fullScreen ?? data.backgroundMode);
        this.backgroundMask.load(data.backgroundMask);
        this.infection.load(data.infection);
        this.interactivity.load(data.interactivity);

        if (data.manualParticles !== undefined) {
            this.manualParticles = data.manualParticles.map((t) => {
                const tmp = new ManualParticle();

                tmp.load(t);

                return tmp;
            });
        }

        this.motion.load(data.motion);
        this.particles.load(data.particles);

        Plugins.loadOptions(this, data);

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
                const optTheme = new Theme();
                optTheme.load(theme);
                this.themes.push(optTheme);
            }
        }
    }

    public setTheme(name?: string): void {
        if (name) {
            const chosenTheme = this.themes.find((theme) => theme.name === name);

            if (chosenTheme) {
                this.load(chosenTheme.options);
            }
        } else {
            const clientDarkMode =
                typeof matchMedia !== "undefined" && matchMedia("(prefers-color-scheme: dark)").matches;

            let defaultTheme = this.themes.find(
                (theme) =>
                    theme.default.value &&
                    ((theme.default.mode === ThemeMode.dark && clientDarkMode) ||
                        (theme.default.mode === ThemeMode.light && !clientDarkMode))
            );

            if (!defaultTheme) {
                defaultTheme = this.themes.find((theme) => theme.default.value && theme.default.mode === ThemeMode.any);
            }

            if (defaultTheme) {
                this.load(defaultTheme.options);
            }
        }
    }

    private importPreset(preset: string): void {
        this.load(Plugins.getPreset(preset));
    }

    public setResponsive(width: number, pxRatio: number, defaultOptions: IOptions): void {
        this.load(defaultOptions);
        this.load(this.responsive.find((t) => t.maxWidth * pxRatio > width)?.options);
    }
}
