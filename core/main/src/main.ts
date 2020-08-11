import { MainSlim } from "./main.slim";
import { AbsorbersPlugin } from "./Plugins/Absorbers/AbsorbersPlugin";
import { EmittersPlugin } from "./Plugins/Emitters/EmittersPlugin";
import { PolygonMaskPlugin } from "./Plugins/PolygonMask/PolygonMaskPlugin";

/**
 * Main class for creating the singleton on window.
 * It's a proxy to the static [[Loader]] class
 */
export class Main extends MainSlim {
    constructor() {
        super();

        this.addPlugin(AbsorbersPlugin);
        this.addPlugin(EmittersPlugin);
        this.addPlugin(PolygonMaskPlugin);
    }
}
