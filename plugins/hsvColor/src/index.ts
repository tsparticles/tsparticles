import { addColorManager } from "@tsparticles/engine";

/**
 */
export async function loadHsvColorPlugin(): Promise<void> {
    const { HsvColorManager } = await import("./HsvColorManager.js");

    addColorManager(new HsvColorManager());
}
