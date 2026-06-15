import type { Container } from "../Core/Container.js";
import type { IParticlesOptions } from "../Options/Interfaces/Particles/IParticlesOptions.js";
import { ParticlesOptions } from "../Options/Classes/Particles/ParticlesOptions.js";
import type { PluginManager } from "../Core/Utils/PluginManager.js";
import type { RecursivePartial } from "../Types/RecursivePartial.js";
import { loadOptions } from "./OptionLoader.js";

/**
 * @param pluginManager - The plugin manager
 * @param container - The container to handle
 * @param sourceOptionsArr - The sourceOptionsArr
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
