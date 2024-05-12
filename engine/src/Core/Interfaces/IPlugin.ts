import type { Container } from "../Container.js";
import type { IContainerPlugin } from "./IContainerPlugin.js";
import type { ISourceOptions } from "../../Types/ISourceOptions.js";
import type { Options } from "../../Options/Classes/Options.js";

/**
 * [[include:Plugins.md]]
 */
export interface IPlugin {
    readonly id: string;

    getPlugin(container: Container): Promise<IContainerPlugin>;

    loadOptions(options: Options, source?: ISourceOptions): void;

    needsPlugin(options?: ISourceOptions): boolean;
}
