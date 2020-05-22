import type { Container } from "../Container";
import type { IContainerPlugin } from "./IContainerPlugin";
import { IOptions } from "../../Options/Interfaces/IOptions";
import { RecursivePartial } from "../../Types/RecursivePartial";

export interface IPlugin {
    readonly id: string;

    needsPlugin(options?: RecursivePartial<IOptions>): boolean;

    getPlugin(container: Container): IContainerPlugin;
}
