import type { Container } from "../Container";
import { IContainerPlugin } from "./IContainerPlugin";

export interface IPlugin {
    readonly id: string;

    needsPlugin(container: Container): boolean;

    getPlugin(container: Container): IContainerPlugin;
}
