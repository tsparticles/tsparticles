import type { IContainerPlugin } from "../Core/Interfaces/IContainerPlugin";
import type { IPlugin } from "../Core/Interfaces/IPlugin";
import type { Container } from "../Core/Container";
import type { RecursivePartial } from "../Types";
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
        return Plugins.plugins.find((t) => t.id === plugin);
    }

    public static addPlugin(plugin: IPlugin): void {
        if (!Plugins.getPlugin(plugin.id)) {
            Plugins.plugins.push(plugin);
        }
    }

    public static getAvailablePlugins(container: Container): Map<string, IContainerPlugin> {
        const res = new Map<string, IContainerPlugin>();

        for (const plugin of Plugins.plugins) {
            if (!plugin.needsPlugin(container.options)) {
                continue;
            }
            res.set(plugin.id, plugin.getPlugin(container));
        }

        return res;
    }

    public static loadOptions(options: Options, sourceOptions: RecursivePartial<IOptions>): void {
        for (const plugin of Plugins.plugins) {
            plugin.loadOptions(options, sourceOptions);
        }
    }

    public static getPreset(preset: string): RecursivePartial<IOptions> | undefined {
        return Plugins.presets.get(preset);
    }

    public static addPreset(presetKey: string, options: RecursivePartial<IOptions>): void {
        if (!Plugins.getPreset(presetKey)) {
            Plugins.presets.set(presetKey, options);
        }
    }

    public static addShapeDrawer(type: string, drawer: IShapeDrawer): void {
        if (!Plugins.getShapeDrawer(type)) {
            Plugins.drawers.set(type, drawer);
        }
    }

    public static getShapeDrawer(type: string): IShapeDrawer | undefined {
        return Plugins.drawers.get(type);
    }

    public static getSupportedShapes(): IterableIterator<string> {
        return Plugins.drawers.keys();
    }
}
