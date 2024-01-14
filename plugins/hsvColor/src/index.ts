import { HsvColorManager } from "./HsvColorManager.js";
import { addColorManager } from "@tsparticles/engine";

/**
 */
export async function loadHsvColorPlugin(): Promise<void> {
    addColorManager(new HsvColorManager());

    await Promise.resolve();
}
