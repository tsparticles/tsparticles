import { MainSlim } from "tsparticles-slim";
import { loadPlugin as loadAbsorbersPlugin } from "tsparticles-plugin-absorbers";
import { loadPlugin as loadEmittersPlugin } from "tsparticles-plugin-emitters";
import { loadPlugin as loadPolygonMaskPlugin } from "tsparticles-plugin-polygon-mask";
import { TrailMaker } from "tsparticles-core/Interactions/External/TrailMaker";
import { Lighter as MouseLighter } from "tsparticles-core/Interactions/External/Lighter";
import { Lighter as ParticlesLighter } from "tsparticles-core/Interactions/Particles/Lighter";
import { OrbitUpdater } from "tsparticles-core/Updaters/OrbitUpdater";

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

        loadAbsorbersPlugin(this);
        loadEmittersPlugin(this);
        loadPolygonMaskPlugin(this);
    }
}
