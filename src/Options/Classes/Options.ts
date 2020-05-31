import type { IOptions } from "../Interfaces/IOptions";
import { Interactivity } from "./Interactivity/Interactivity";
import { Particles } from "./Particles/Particles";
import { BackgroundMask } from "./BackgroundMask/BackgroundMask";
import type { RecursivePartial } from "../../Types/RecursivePartial";
import { Background } from "./Background/Background";
import { Infection } from "./Infection/Infection";
import { Plugins } from "../../Utils";

export class Options implements IOptions {
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

    public background: Background;
    public backgroundMask: BackgroundMask;
    public detectRetina: boolean;
    public fpsLimit: number;
    public infection: Infection;
    public interactivity: Interactivity;
    public particles: Particles;
    public pauseOnBlur: boolean;
    public preset?: string | string[];

    constructor() {
        this.background = new Background();
        this.backgroundMask = new BackgroundMask();
        this.detectRetina = false;
        this.fpsLimit = 30;
        this.infection = new Infection();
        this.interactivity = new Interactivity();
        this.particles = new Particles();
        this.pauseOnBlur = true;
    }

    /**
     * This methods loads the source object in the current instance
     * @param data the source data to load into the instance
     */
    public load(data?: RecursivePartial<IOptions>): void {
        if (data !== undefined) {
            if (data.preset !== undefined) {
                if (data.preset instanceof Array) {
                    for (const preset of data.preset) {
                        this.importPreset(preset);
                    }
                } else {
                    this.importPreset(data.preset);
                }
            }

            if (data.background !== undefined) {
                this.background.load(data.background);
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

            this.particles.load(data.particles);
            this.infection.load(data.infection);
            this.interactivity.load(data.interactivity);

            this.backgroundMask.load(data.backgroundMask);

            Plugins.loadOptions(this, data);
        }
    }

    private importPreset(preset: string): void {
        const presetOptions = Plugins.getPreset(preset);

        if (presetOptions !== undefined) {
            this.load(presetOptions);
        }
    }
}
