import type { IContainerPlugin } from "../Core/Interfaces/IContainerPlugin";
import type { IPlugin } from "../Core/Interfaces/IPlugin";
import type { Container } from "../Core/Container";
import type { RecursivePartial } from "../Types/RecursivePartial";
import type { IOptions } from "../Options/Interfaces/IOptions";
import type { IShapeDrawer } from "../Core/Interfaces/IShapeDrawer";
import type { Options } from "../Options/Classes/Options";

export class Plugins {
    private static readonly plugins: IPlugin[] = [];
    private static readonly presets: Map<string, RecursivePartial<IOptions>> = new Map<
        string,
        RecursivePartial<IOptions>
    >();
    private static readonly drawers: Map<string, IShapeDrawer> = new Map<string, IShapeDrawer>();

    public static getPlugin(plugin: string): IPlugin | undefined {
        return this.plugins.filter((t) => t.id === plugin)[0];
    }

    public static addPlugin(plugin: IPlugin): void {
        if (!this.getPlugin(plugin.id)) {
            this.plugins.push(plugin);
        }
    }

    public static getAvailablePlugins(container: Container): Map<string, IContainerPlugin> {
        const res = new Map<string, IContainerPlugin>();
        const availablePlugins = this.plugins.filter((t) => t.needsPlugin(container.options));

        for (const plugin of availablePlugins) {
            res.set(plugin.id, plugin.getPlugin(container));
        }

        return res;
    }

    public static loadOptions(options: Options, sourceOptions: RecursivePartial<IOptions>): void {
        for (const plugin of this.plugins) {
            plugin.loadOptions(options, sourceOptions);
        }
    }

    public static getPreset(preset: string): RecursivePartial<IOptions> | undefined {
        return this.presets.get(preset);
    }

    public static addPreset(presetKey: string, options: RecursivePartial<IOptions>): void {
        if (!this.getPreset(presetKey)) {
            this.presets.set(presetKey, options);
        }
    }

    public static addShapeDrawer(type: string, drawer: IShapeDrawer): void {
        if (!this.getShapeDrawer(type)) {
            this.drawers.set(type, drawer);
        }
    }

    public static getShapeDrawer(type: string): IShapeDrawer | undefined {
        return this.drawers.get(type);
    }

    public static getSupportedShapes(): IterableIterator<string> {
        return this.drawers.keys();
    }
}
