import type { IOptions } from "../../Interfaces/Options/IOptions";
import { Interactivity } from "./Interactivity/Interactivity";
import { Particles } from "./Particles/Particles";
import { PolygonMask } from "./PolygonMask/PolygonMask";
import type { IInteractivity } from "../../Interfaces/Options/Interactivity/IInteractivity";
import type { IParticles } from "../../Interfaces/Options/Particles/IParticles";
import type { IPolygonMask } from "../../Interfaces/Options/PolygonMask/IPolygonMask";
import type { IBackgroundMask } from "../../Interfaces/Options/BackgroundMask/IBackgroundMask";
import { BackgroundMask } from "./BackgroundMask/BackgroundMask";
import type { RecursivePartial } from "../../Types/RecursivePartial";
import { PresetType } from "../../Enums/PresetType";
import { Presets } from "../Utils/Presets";

export class Options implements IOptions {
    /**
     *
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
     *
     * @deprecated this property is obsolete, please use the new retinaDetect
     */
    public get retina_detect(): boolean {
        return this.detectRetina;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new retinaDetect
     * @param value
     */
    public set retina_detect(value: boolean) {
        this.detectRetina = value;
    }

    public detectRetina: boolean;
    public fpsLimit: number;
    public interactivity: IInteractivity;
    public particles: IParticles;
    public polygon: IPolygonMask;
    public backgroundMask: IBackgroundMask;
    public pauseOnBlur: boolean;
    public preset?: PresetType | PresetType[]

    constructor() {
        this.detectRetina = false;
        this.fpsLimit = 60;
        this.interactivity = new Interactivity();
        this.particles = new Particles();
        this.polygon = new PolygonMask();
        this.backgroundMask = new BackgroundMask();
        this.pauseOnBlur = true;
    }

    public load(data: RecursivePartial<IOptions>): void {
        if (data !== undefined) {
            if (data.detectRetina !== undefined) {
                this.detectRetina = data.detectRetina;
            } else if (data.retina_detect !== undefined) {
                this.retina_detect = data.retina_detect;
            }

            if (data.fpsLimit !== undefined) {
                this.fpsLimit = data.fpsLimit;
            } else if (data.fps_limit !== undefined) {
                this.fps_limit = data.fps_limit;
            }

            if (data.pauseOnBlur !== undefined) {
                this.pauseOnBlur = data.pauseOnBlur;
            }

            this.interactivity.load(data.interactivity);
            this.particles.load(data.particles);
            this.polygon.load(data.polygon);
            this.backgroundMask.load(data.backgroundMask);

            if (data.preset !== undefined) {
                if (data.preset instanceof Array) {
                    for (const preset of data.preset) {
                        this.importPreset(preset);
                    }
                } else {
                    this.importPreset(data.preset);
                }
            }
        }
    }

    private importPreset(preset: PresetType): void {
        const presetOptions = Presets.getPreset(preset);

        if (presetOptions !== undefined) {
            this.load(presetOptions);
        }
    }
}
