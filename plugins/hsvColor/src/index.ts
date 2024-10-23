import { HsvColorManager } from "./HsvColorManager.js";
import { addColorManager } from "@tsparticles/engine";

/**
 * This function is used to load the HSV color plugin
 * @returns A promise that resolves when the plugin is loaded
 */
export function loadHsvColorPlugin(): Promise<void> {
    addColorManager(new HsvColorManager());

    return Promise.resolve();
}
