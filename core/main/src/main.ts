import { MainSlim } from "./main.slim";
import { AbsorbersPlugin } from "./Plugins/Absorbers/AbsorbersPlugin";
import { PolygonMaskPlugin } from "./Plugins/PolygonMask/PolygonMaskPlugin";
import { loadInfectionPlugin } from "./Plugins/Infection/plugin";
import { loadEmittersPlugin } from "./Plugins/Emitters/plugin";

/**
 * Main class for creating the singleton on window.
 * It's a singleton proxy to the static [[Loader]] class for initializing [[Container]] instances
 * @category Main
 */
export class Main extends MainSlim {
    constructor() {
        super();

        this.addPlugin(AbsorbersPlugin);
        loadEmittersPlugin(this);
        this.addPlugin(PolygonMaskPlugin);
        loadInfectionPlugin(this);
    }
}
