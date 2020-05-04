import { IPlugin } from "../Core/Interfaces/IPlugin";
import { IPluginManager } from "../Core/Interfaces/IPluginManager";
import { Container } from "../Core/Container";

export class Plugins {
    private static plugins: IPluginManager[] = [];

    public static getPlugin(plugin: string): IPluginManager | undefined {
        return this.plugins.filter(t => t.id === plugin)[0];
    }

    public static addPlugin(plugin: IPluginManager): void {
        if (!this.getPlugin(plugin.id)) {
            this.plugins.push(plugin);
        }
    }

    public static getAvailablePlugins(container: Container): IPlugin[] {
        return this.plugins.filter(t => t.needsPlugin(container)).map(t => t.getPlugin(container));
    }
}