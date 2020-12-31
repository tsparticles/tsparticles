import { MainSlim } from "tsparticles-slim";
import { AbsorbersPlugin } from "tsparticles-core/Plugins/Absorbers/AbsorbersPlugin";
import { EmittersPlugin } from "tsparticles-core/Plugins/Emitters/EmittersPlugin";
import { PolygonMaskPlugin } from "tsparticles-core/Plugins/PolygonMask/PolygonMaskPlugin";
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
        this.addPlugin(AbsorbersPlugin);
        this.addPlugin(EmittersPlugin);
        this.addPlugin(PolygonMaskPlugin);
    }
}
