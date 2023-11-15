import { SimplexNoise2D } from "./Classes/SimplexNoise2D.js";
import { SimplexNoise3D } from "./Classes/SimplexNoise3D.js";
import { SimplexNoise4D } from "./Classes/SimplexNoise4D.js";

export class SimplexNoise {
    noise2d;
    noise3d;
    noise4d;

    constructor() {
        this.noise2d = new SimplexNoise2D();
        this.noise3d = new SimplexNoise3D();
        this.noise4d = new SimplexNoise4D();
    }
}
