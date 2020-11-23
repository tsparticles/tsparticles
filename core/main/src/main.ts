import { MainSlim } from "./main.slim";
import { AbsorbersPlugin } from "./Plugins/Absorbers/AbsorbersPlugin";
import { EmittersPlugin } from "./Plugins/Emitters/EmittersPlugin";
import { PolygonMaskPlugin } from "./Plugins/PolygonMask/PolygonMaskPlugin";
import { TrailMaker } from "./Interactions/External/TrailMaker";
import { Lighter as MouseLighter } from "./Interactions/External/Lighter";
import { Lighter as ParticlesLighter } from "./Interactions/Particles/Lighter";
import { OrbitUpdater } from "./Updaters/OrbitUpdater";

/**
 * Main class for creating the singleton on window.
 * It's a singleton proxy to the static [[Loader]] class for initializing [[Container]] instances
 * @category Main
 */
export class Main extends MainSlim {
    constructor() {
        super();

        this.addInteractor((container) => new ParticlesLighter(container));
        this.addInteractor((container) => new MouseLighter(container));
        this.addInteractor((container) => new TrailMaker(container));
        this.addParticleUpdater((container) => new OrbitUpdater(container));
        this.addPlugin(AbsorbersPlugin);
        this.addPlugin(EmittersPlugin);
        this.addPlugin(PolygonMaskPlugin);
    }
}
