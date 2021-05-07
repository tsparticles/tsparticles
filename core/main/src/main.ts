import { MainSlim } from "./main.slim";
import { AbsorbersPlugin } from "./Plugins/Absorbers/AbsorbersPlugin";
import { EmittersPlugin } from "./Plugins/Emitters/EmittersPlugin";
import { PolygonMaskPlugin } from "./Plugins/PolygonMask/PolygonMaskPlugin";
import { RepulsersPlugin } from "./Plugins/Repulsers/RepulsersPlugin";

/**
 * Main class for creating the singleton on window.
 * It's a singleton proxy to the static [[Loader]] class for initializing [[Container]] instances
 * @category Main
 */
export class Main extends MainSlim {
    constructor() {
        super();

        this.addPlugin(AbsorbersPlugin);
        this.addPlugin(EmittersPlugin);
        this.addPlugin(PolygonMaskPlugin);
        this.addPlugin(RepulsersPlugin);
    }
}
