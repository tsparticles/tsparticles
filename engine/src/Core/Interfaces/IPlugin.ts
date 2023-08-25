import type { Container } from "../Container.js";
import type { IContainerPlugin } from "./IContainerPlugin.js";
import type { IOptions } from "../../Options/Interfaces/IOptions.js";
import type { Options } from "../../Options/Classes/Options.js";
import type { RecursivePartial } from "../../Types/RecursivePartial.js";

/**
 * [[include:Plugins.md]]
 */
export interface IPlugin {
    readonly id: string;

    getPlugin(container: Container): IContainerPlugin;

    loadOptions(options: Options, source?: RecursivePartial<IOptions>): void;

    needsPlugin(options?: RecursivePartial<IOptions>): boolean;
}
