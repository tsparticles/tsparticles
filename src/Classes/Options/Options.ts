import {IOptions} from "../../Interfaces/Options/IOptions";
import {Interactivity} from "./Interactivity/Interactivity";
import {Particles} from "./Particles/Particles";
import {PolygonMask} from "./PolygonMask/PolygonMask";
import {IInteractivity} from "../../Interfaces/Options/Interactivity/IInteractivity";
import {IParticles} from "../../Interfaces/Options/Particles/IParticles";
import {IPolygonMask} from "../../Interfaces/Options/PolygonMask/IPolygonMask";
import {Messages} from "../Utils/Messages";
import {Utils} from "../Utils/Utils";
import {IBackgroundMask} from "../../Interfaces/Options/BackgroundMask/IBackgroundMask";
import {BackgroundMask} from "./BackgroundMask/BackgroundMask";

export class Options implements IOptions {
    /**
     *
     * @deprecated this property is obsolete, please use the new fpsLimit
     */
    public get fps_limit(): number {
        Messages.deprecated("fps_limit", "fpsLimit");

        return this.fpsLimit;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new fpsLimit
     * @param value
     */
    public set fps_limit(value: number) {
        Messages.deprecated("fps_limit", "fpsLimit");

        this.fpsLimit = value;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new retinaDetect
     */
    public get retina_detect(): boolean {
        Messages.deprecated("retina_detect", "detectsRetina");

        return this.detectRetina;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new retinaDetect
     * @param value
     */
    public set retina_detect(value: boolean) {
        Messages.deprecated("retina_detect", "detectsRetina");

        this.detectRetina = value;
    }

    public detectRetina: boolean;
    public fpsLimit: number;
    public interactivity: IInteractivity;
    public particles: IParticles;
    public polygon: IPolygonMask;
    public backgroundMask: IBackgroundMask;
    public pauseOnBlur: boolean;

    constructor() {
        this.detectRetina = false;
        this.fpsLimit = 60;
        this.interactivity = new Interactivity();
        this.particles = new Particles();
        this.polygon = new PolygonMask();
        this.backgroundMask = new BackgroundMask();
        this.pauseOnBlur = true;
    }

    public load(data: IOptions): void {
        if (Utils.hasData(data)) {
            if (Utils.hasData(data.detectRetina)) {
                this.detectRetina = data.detectRetina;
            }

            if (Utils.hasData(data.retina_detect)) {
                this.retina_detect = data.retina_detect;
            }

            if (Utils.hasData(data.fpsLimit)) {
                this.fpsLimit = data.fpsLimit;
            }

            if (Utils.hasData(data.fps_limit)) {
                this.fps_limit = data.fps_limit;
            }

            if (Utils.hasData(data.pauseOnBlur)) {
                this.pauseOnBlur = data.pauseOnBlur;
            }

            this.interactivity.load(data.interactivity);
            this.particles.load(data.particles);
            this.polygon.load(data.polygon);
            this.backgroundMask.load(data.backgroundMask);
        }
    }
}
