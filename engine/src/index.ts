import { init } from "./init";
import { isSsr } from "./Utils/Utils";

const tsParticles = init();

if (!isSsr()) {
    window.tsParticles = tsParticles;
}

export * from "./exports";
export * from "./export-types";

export { tsParticles };
