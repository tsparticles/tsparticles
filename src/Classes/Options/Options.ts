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

    constructor() {
        this.detectRetina = false;
        this.fpsLimit = 60;
        this.interactivity = new Interactivity();
        this.particles = new Particles();
        this.polygon = new PolygonMask();
        this.backgroundMask = new BackgroundMask();
    }

    public load(data: IOptions): void {
        if (Utils.hasData(data)) {
            const detectRetina = data.detectRetina ?? data.retina_detect;

            if (Utils.hasData(detectRetina)) {
                this.detectRetina = detectRetina;
            }

            const fpsLimit = data.fpsLimit ?? data.fps_limit;

            if (Utils.hasData(fpsLimit)) {
                this.fpsLimit = fpsLimit;
            }

            this.interactivity.load(data.interactivity);
            this.particles.load(data.particles);
            this.polygon.load(data.polygon);
            this.backgroundMask.load(data.backgroundMask);
        }
    }
}
