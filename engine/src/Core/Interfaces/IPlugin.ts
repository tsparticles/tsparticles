/**
 * [[include:Plugins.md]]
 * @packageDocumentation
 */
import type { Container } from "../Container";
import type { IContainerPlugin } from "./IContainerPlugin";
import type { IOptions } from "../../Options/Interfaces/IOptions";
import type { Options } from "../../Options/Classes/Options";
import type { RecursivePartial } from "../../Types";

/**
 * [[include:Plugins.md]]
 * @category Interfaces
 */
export interface IPlugin {
    readonly id: string;

    needsPlugin(options?: RecursivePartial<IOptions>): boolean;

    getPlugin(container: Container): IContainerPlugin;

    loadOptions(options: Options, source?: RecursivePartial<IOptions>): void;
}
