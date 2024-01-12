/**
 */
export async function loadHsvColorPlugin(): Promise<void> {
    const { HsvColorManager } = await import("./HsvColorManager.js"),
        { addColorManager } = await import("@tsparticles/engine");

    addColorManager(new HsvColorManager());
}
