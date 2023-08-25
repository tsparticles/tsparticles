import { init } from "./init.js";
import { isSsr } from "./Utils/Utils.js";

const tsParticles = init();

if (!isSsr()) {
    window.tsParticles = tsParticles;
}

export * from "./exports.js";
export * from "./export-types.js";

export { tsParticles };
