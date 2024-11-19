import { NamedColorManager } from "./NamedColorManager.js";
import { addColorManager } from "@tsparticles/engine";

/**
 * This function is used to load the HSV color plugin
 * @returns A promise that resolves when the plugin is loaded
 */
export function loadNamedColorPlugin(): Promise<void> {
    addColorManager(new NamedColorManager());

    return Promise.resolve();
}
