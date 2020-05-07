import type { IContainerPlugin } from "../Core/Interfaces/IContainerPlugin";
import type { IPlugin } from "../Core/Interfaces/IPlugin";
import type { Container } from "../Core/Container";
import type { RecursivePartial } from "../Types/RecursivePartial";
import type { IOptions } from "../Options/Interfaces/IOptions";
import type { IShapeDrawer } from "../Core/Interfaces/IShapeDrawer";

export class Plugins {
    private static plugins: IPlugin[] = [];
    private static presets: { [preset: string]: RecursivePartial<IOptions> } = {};
    private static readonly drawers: { [type: string]: IShapeDrawer } = {};

    public static getPlugin(plugin: string): IPlugin | undefined {
        return this.plugins.filter((t) => t.id === plugin)[0];
    }

    public static addPlugin(plugin: IPlugin): void {
        if (!this.getPlugin(plugin.id)) {
            this.plugins.push(plugin);
        }
    }

    public static getAvailablePlugins(container: Container): { [id: string]: IContainerPlugin } {
        const res: { [id: string]: IContainerPlugin } = {};
        const availablePlugins = this.plugins.filter((t) => t.needsPlugin(container));

        for (const plugin of availablePlugins) {
            res[plugin.id] = plugin.getPlugin(container);
        }

        return res;
    }

    public static getPreset(preset: string): RecursivePartial<IOptions> | undefined {
        return this.presets[preset];
    }

    public static addPreset(presetKey: string, options: RecursivePartial<IOptions>): void {
        if (!this.getPreset(presetKey)) {
            this.presets[presetKey] = options;
        }
    }

    public static addShapeDrawer(type: string, drawer: IShapeDrawer): void {
        if (!this.drawers[type]) {
            this.drawers[type] = drawer;
        }
    }

    public static getShapeDrawer(type: string): IShapeDrawer {
        return this.drawers[type];
    }

    public static getSupportedShapes(): string[] {
        return Object.keys(this.drawers);
    }
}
