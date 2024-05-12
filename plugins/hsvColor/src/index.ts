import { HsvColorManager } from "./HsvColorManager.js";
import { addColorManager } from "@tsparticles/engine";

/**
 */
export function loadHsvColorPlugin(): Promise<void> {
    addColorManager(new HsvColorManager());

    return Promise.resolve();
}
