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
  readonly id: string;

  loadParticlesOptions?: (
    container: Container,
    options: ParticlesOptions,
    source?: RecursivePartial<IParticlesOptions>,
  ) => void;

  getPlugin(container: Container): Promise<IContainerPlugin>;

  loadOptions(container: Container, options: Options, source?: ISourceOptions): void;

  needsPlugin(options?: ISourceOptions): boolean;
}
