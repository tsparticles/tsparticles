import { HsvColorManager } from "./HsvColorManager";
import { addColorManager } from "tsparticles-engine";

/**
 */
export async function loadHsvColorPlugin(): Promise<void> {
    addColorManager(new HsvColorManager());
}
