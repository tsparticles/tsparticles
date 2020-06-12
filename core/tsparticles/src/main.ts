import { MainSlim } from "./main.slim";
import { AbsorbersPlugin as absorbers } from "./Plugins/Absorbers/AbsorbersPlugin";
import { EmittersPlugin as emitters } from "./Plugins/Emitters/EmittersPlugin";
import { PolygonMaskPlugin as polygonMask } from "./Plugins/PolygonMask/PolygonMaskPlugin";

/**
 * Main class for creating the singleton on window.
 * It's a proxy to the static [[Loader]] class
 */
export class Main extends MainSlim {
    constructor() {
        super();

        this.addPlugin(absorbers);
        this.addPlugin(emitters);
        this.addPlugin(polygonMask);
    }
}
