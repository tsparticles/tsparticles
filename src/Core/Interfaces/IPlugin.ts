import type { Container } from "../Container";
import type { IContainerPlugin } from "./IContainerPlugin";
import { IOptions } from "../../Options/Interfaces/IOptions";
import { RecursivePartial } from "../../Types/RecursivePartial";
import { Options } from "../../Options/Classes/Options";

export interface IPlugin {
    readonly id: string;

    needsPlugin(options?: RecursivePartial<IOptions>): boolean;

    getPlugin(container: Container): IContainerPlugin;

    loadOptions(options: Options, source?: RecursivePartial<IOptions>): void;
}
