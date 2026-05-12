import type { Container } from "../Container.js";
import type { IContainerPlugin } from "./IContainerPlugin.js";
import type { IParticlesOptions } from "../../Options/Interfaces/Particles/IParticlesOptions.js";
import type { ISourceOptions } from "../../Types/ISourceOptions.js";
import type { Options } from "../../Options/Classes/Options.js";
import type { ParticlesOptions } from "../../Options/Classes/Particles/ParticlesOptions.js";
import type { RecursivePartial } from "../../Types/RecursivePartial.js";

/**
 * [[include:Plugins.md]]
 */
export interface IPlugin {
  /** The unique identifier for this plugin */
  readonly id: string;

  /** Loads options for particles, called when building particle options */
  loadParticlesOptions?: (
    container: Container,
    options: ParticlesOptions,
    source?: RecursivePartial<IParticlesOptions>,
  ) => void;

  /** Gets the container plugin instance for the given container */
  getPlugin(container: Container): Promise<IContainerPlugin>;

  /** Loads the plugin options into the given options object */
  loadOptions(container: Container, options: Options, source?: ISourceOptions): void;

  /** Checks if this plugin is needed for the given options */
  needsPlugin(options?: ISourceOptions): boolean;
}
