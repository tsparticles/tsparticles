import type { Container } from "../Container";
import { IPlugin } from "./IPlugin";

export interface IPluginManager {
    readonly id: string;

    needsPlugin(container: Container): boolean;

    getPlugin(container: Container): IPlugin;
}
