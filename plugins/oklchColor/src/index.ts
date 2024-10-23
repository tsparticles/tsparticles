import { LchColorManager } from "./LchColorManager";
import { OklchColorManager } from "./OklchColorManager.js";
import { addColorManager } from "@tsparticles/engine";

/**
 * This function is used to load the Oklch color plugin
 * @returns A promise that resolves when the plugin is loaded
 */
export function loadOklchColorPlugin(): Promise<void> {
    addColorManager(new OklchColorManager());
    addColorManager(new LchColorManager());

    return Promise.resolve();
}
