import type { Container } from "../Core/Container.js";
import type { IOptionLoader } from "../Options/Interfaces/IOptionLoader.js";
import type { IParticlesOptions } from "../Options/Interfaces/Particles/IParticlesOptions.js";
import { ParticlesOptions } from "../Options/Classes/Particles/ParticlesOptions.js";
import type { PluginManager } from "../Core/Utils/PluginManager.js";
import type { RecursivePartial } from "../Types/RecursivePartial.js";

/**
 * Loads one or more partial source options into an option loader.
 * @param options - Target option loader.
 * @param sourceOptionsArr - Source option chunks to merge.
 */
export function loadOptions<T>(
  options: IOptionLoader<T>,
  ...sourceOptionsArr: RecursivePartial<T | undefined>[]
): void {
  for (const sourceOptions of sourceOptionsArr) {
    options.load(sourceOptions);
  }
}

/**
 * @param pluginManager -
 * @param container -
 * @param sourceOptionsArr -
 * @returns the newly created {@link ParticlesOptions} object
 */
export function loadParticlesOptions(
  pluginManager: PluginManager,
  container: Container,
  ...sourceOptionsArr: RecursivePartial<IParticlesOptions | undefined>[]
): ParticlesOptions {
  const options = new ParticlesOptions(pluginManager, container);

  loadOptions(options, ...sourceOptionsArr);

  return options;
}
