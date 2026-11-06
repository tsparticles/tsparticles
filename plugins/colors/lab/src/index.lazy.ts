import type { Engine } from "@tsparticles/engine/lazy";

declare const __VERSION__: string;

/**
 * This function is used to load the Lab color plugin lazily
 * @param engine - The engine, used to add the color manager
 */
export async function loadLabColorPlugin(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(async e => {
    const { LabColorManager } = await import("./LabColorManager.js");

    e.pluginManager.addColorManager("lab", new LabColorManager());
  });
}
