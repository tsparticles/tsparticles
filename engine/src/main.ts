import { MainSlim } from "./main.slim";
import { loadInfectionPlugin } from "./Plugins/Infection/plugin";
import { loadEmittersPlugin } from "./Plugins/Emitters/plugin";
import { loadPolygonMaskPlugin } from "./Plugins/PolygonMask/plugin";
import { loadAbsorbersPlugin } from "./Plugins/Absorbers/plugin";

/**
 * Main class for creating the singleton on window.
 * It's a singleton proxy to the static [[Loader]] class for initializing [[Container]] instances
 * @category Main
 */
export class Main extends MainSlim {
    constructor() {
        super();

        loadAbsorbersPlugin(this);
        loadEmittersPlugin(this);
        loadInfectionPlugin(this);
        loadPolygonMaskPlugin(this);
    }
}
