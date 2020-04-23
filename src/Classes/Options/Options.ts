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
import { Presets } from "../Utils/Presets";
import type { IBackground } from "../../Interfaces/Options/Background/IBackground";
import { Background } from "./Background/Background";
import type { SingleOrMultiple } from "../../Types/SingleOrMultiple";
import type { IEmitter } from "../../Interfaces/Options/Emitters/IEmitter";
import { Emitter } from "./Emitters/Emitter";
import type { IAbsorber } from "../../Interfaces/Options/Absorbers/IAbsorber";
import { Absorber } from "./Absorbers/Absorber";

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

    public absorbers: SingleOrMultiple<IAbsorber>;
    public background: IBackground;
    public backgroundMask: IBackgroundMask;
    public detectRetina: boolean;
    public emitters: SingleOrMultiple<IEmitter>;
    public fpsLimit: number;
    public interactivity: IInteractivity;
    public particles: IParticles;
    public polygon: IPolygonMask;
    public pauseOnBlur: boolean;
    public preset?: string | string[];

    constructor() {
        this.absorbers = [];
        this.background = new Background();
        this.backgroundMask = new BackgroundMask();
        this.detectRetina = false;
        this.emitters = [];
        this.fpsLimit = 30;
        this.interactivity = new Interactivity();
        this.particles = new Particles();
        this.pauseOnBlur = true;
        this.polygon = new PolygonMask();
    }

    /**
     * This methods loads the source object in the current instance
     * @param data the source data to load into the instance
     */
    public load(data: RecursivePartial<IOptions>): void {
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

            (this.interactivity as Interactivity).load(data.interactivity, this.particles);

            this.polygon.load(data.polygon);
            this.backgroundMask.load(data.backgroundMask);

            if (data.emitters !== undefined) {
                if (data.emitters instanceof Array) {
                    this.emitters = data.emitters.map((s) => {
                        const tmp = new Emitter();

                        tmp.load(s, this.particles);

                        return tmp;
                    });
                } else {
                    if (this.emitters instanceof Array) {
                        this.emitters = new Emitter();
                    }

                    (this.emitters as Emitter).load(data.emitters, this.particles);
                }
            }

            if (data.absorbers !== undefined) {
                if (data.absorbers instanceof Array) {
                    this.absorbers = data.absorbers.map((s) => {
                        const tmp = new Absorber();

                        tmp.load(s);

                        return tmp;
                    });
                } else {
                    if (this.emitters instanceof Array) {
                        this.absorbers = new Absorber();
                    }

                    (this.absorbers as Absorber).load(data.absorbers);
                }
            }
        }
    }

    private importPreset(preset: string): void {
        const presetOptions = Presets.getPreset(preset);

        if (presetOptions !== undefined) {
            this.load(presetOptions);
        }
    }
}
