import type {
    IContainerPlugin,
    IInteractor,
    IMovePathGenerator,
    IParticleUpdater,
    IPlugin,
    IShapeDrawer,
} from "../Core/Interfaces";
import type { Container } from "../Core/Container";
import type { RecursivePartial } from "../Types";
import type { IOptions } from "../Options/Interfaces/IOptions";
import type { Options } from "../Options/Classes/Options";

type InteractorInitializer = (container: Container) => IInteractor;
type UpdaterInitializer = (container: Container) => IParticleUpdater;

const plugins: IPlugin[] = [];
const interactorsInitializers: Map<string, InteractorInitializer> = new Map<string, InteractorInitializer>();
const updatersInitializers: Map<string, UpdaterInitializer> = new Map<string, UpdaterInitializer>();
const interactors: Map<Container, IInteractor[]> = new Map<Container, IInteractor[]>();
const updaters: Map<Container, IParticleUpdater[]> = new Map<Container, IParticleUpdater[]>();
const presets: Map<string, RecursivePartial<IOptions>> = new Map<string, RecursivePartial<IOptions>>();
const drawers: Map<string, IShapeDrawer> = new Map<string, IShapeDrawer>();
const pathGenerators: Map<string, IMovePathGenerator> = new Map<string, IMovePathGenerator>();

/**
 * @category Utils
 */
export class Plugins {
    static getPlugin(plugin: string): IPlugin | undefined {
        return plugins.find((t) => t.id === plugin);
    }

    static addPlugin(plugin: IPlugin): void {
        if (!Plugins.getPlugin(plugin.id)) {
            plugins.push(plugin);
        }
    }

    static getAvailablePlugins(container: Container): Map<string, IContainerPlugin> {
        const res = new Map<string, IContainerPlugin>();

        for (const plugin of plugins) {
            if (!plugin.needsPlugin(container.actualOptions)) {
                continue;
            }
            res.set(plugin.id, plugin.getPlugin(container));
        }

        return res;
    }

    static loadOptions(options: Options, sourceOptions: RecursivePartial<IOptions>): void {
        for (const plugin of plugins) {
            plugin.loadOptions(options, sourceOptions);
        }
    }

    static getPreset(preset: string): RecursivePartial<IOptions> | undefined {
        return presets.get(preset);
    }

    static addPreset(presetKey: string, options: RecursivePartial<IOptions>): void {
        if (!Plugins.getPreset(presetKey)) {
            presets.set(presetKey, options);
        }
    }

    static addShapeDrawer(type: string, drawer: IShapeDrawer): void {
        if (!Plugins.getShapeDrawer(type)) {
            drawers.set(type, drawer);
        }
    }

    static getShapeDrawer(type: string): IShapeDrawer | undefined {
        return drawers.get(type);
    }

    static getSupportedShapes(): IterableIterator<string> {
        return drawers.keys();
    }

    static getPathGenerator(type: string): IMovePathGenerator | undefined {
        return pathGenerators.get(type);
    }

    static addPathGenerator(type: string, pathGenerator: IMovePathGenerator): void {
        if (!Plugins.getPathGenerator(type)) {
            pathGenerators.set(type, pathGenerator);
        }
    }

    public static getInteractors(container: Container): IInteractor[] {
        let res = interactors.get(container);

        if (!res) {
            res = [...interactorsInitializers.values()].map((t) => t(container));

            interactors.set(container, res);
        }

        return res;
    }

    public static addInteractor(name: string, initInteractor: (container: Container) => IInteractor): void {
        interactorsInitializers.set(name, initInteractor);
    }

    public static getUpdaters(container: Container): IParticleUpdater[] {
        let res = updaters.get(container);

        if (!res) {
            res = [...updatersInitializers.values()].map((t) => t(container));

            updaters.set(container, res);
        }

        return res;
    }

    public static addParticleUpdater(name: string, initUpdater: (container: Container) => IParticleUpdater): void {
        updatersInitializers.set(name, initUpdater);
    }
}
