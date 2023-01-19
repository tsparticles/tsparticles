/**
 * [[include:Plugins.md]]
 * @packageDocumentation
 */
import type { Container } from "../Container";
import type { IContainerPlugin } from "./IContainerPlugin";
import type { ISourceOptions } from "../../Types/ISourceOptions";
import type { Options } from "../../Options/Classes/Options";

/**
 * [[include:Plugins.md]]
 * @category Interfaces
 */
export interface IPlugin {
    readonly id: string;

    getPlugin(container: Container): IContainerPlugin;

    loadOptions(options: Options, source?: ISourceOptions): void;

    needsPlugin(options?: ISourceOptions): boolean;
}
