import {IOptions} from "../../Interfaces/Options/IOptions";
import {Interactivity} from "./Interactivity/Interactivity";
import {Particles} from "./Particles/Particles";
import {PolygonMask} from "./PolygonMask/PolygonMask";
import {IInteractivity} from "../../Interfaces/Options/Interactivity/IInteractivity";
import {IParticles} from "../../Interfaces/Options/Particles/IParticles";
import {IPolygonMask} from "../../Interfaces/Options/PolygonMask/IPolygonMask";

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

    constructor() {
        this.detectRetina = false;
        this.fpsLimit = 60;
        this.interactivity = new Interactivity();
        this.particles = new Particles();
        this.polygon = new PolygonMask();
    }
}
