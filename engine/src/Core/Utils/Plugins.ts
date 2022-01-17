import type {
    IContainerPlugin,
    IInteractor,
    IMovePathGenerator,
    IParticleMover,
    IParticleUpdater,
    IPlugin,
    IShapeDrawer,
} from "../Interfaces";
import type { IOptions, Options } from "../../Options";
import type { Container } from "../Container";
import { Engine } from "../../engine";
import type { RecursivePartial } from "../../Types";

type InteractorInitializer = (container: Container) => IInteractor;
type MoverInitializer = (container: Container) => IParticleMover;
type UpdaterInitializer = (container: Container) => IParticleUpdater;

/**
 * @category Utils
 */
export class Plugins {
    readonly #engine;

    readonly plugins: IPlugin[];
    readonly interactorsInitializers;
    readonly moversInitializers;
    readonly updatersInitializers;
    readonly interactors;
    readonly movers;
    readonly updaters;
    readonly presets;
    readonly drawers;
    readonly pathGenerators;

    constructor(engine: Engine) {
        this.#engine = engine;

        this.plugins = [];
        this.interactorsInitializers = new Map<string, InteractorInitializer>();
        this.moversInitializers = new Map<string, MoverInitializer>();
        this.updatersInitializers = new Map<string, UpdaterInitializer>();
        this.interactors = new Map<Container, IInteractor[]>();
        this.movers = new Map<Container, IParticleMover[]>();
        this.updaters = new Map<Container, IParticleUpdater[]>();
        this.presets = new Map<string, RecursivePartial<IOptions>>();
        this.drawers = new Map<string, IShapeDrawer>();
        this.pathGenerators = new Map<string, IMovePathGenerator>();
    }

    getPlugin(plugin: string): IPlugin | undefined {
        return this.plugins.find((t) => t.id === plugin);
    }

    addPlugin(plugin: IPlugin): void {
        if (!this.getPlugin(plugin.id)) {
            this.plugins.push(plugin);
        }
    }

    getAvailablePlugins(container: Container): Map<string, IContainerPlugin> {
        const res = new Map<string, IContainerPlugin>();

        for (const plugin of this.plugins) {
            if (!plugin.needsPlugin(container.actualOptions)) {
                continue;
            }
            res.set(plugin.id, plugin.getPlugin(container));
        }

        return res;
    }

    loadOptions(options: Options, sourceOptions: RecursivePartial<IOptions>): void {
        for (const plugin of this.plugins) {
            plugin.loadOptions(options, sourceOptions);
        }
    }

    getPreset(preset: string): RecursivePartial<IOptions> | undefined {
        return this.presets.get(preset);
    }

    addPreset(presetKey: string, options: RecursivePartial<IOptions>, override = false): void {
        if (override || !this.getPreset(presetKey)) {
            this.presets.set(presetKey, options);
        }
    }

    addShapeDrawer(type: string, drawer: IShapeDrawer): void {
        if (!this.getShapeDrawer(type)) {
            this.drawers.set(type, drawer);
        }
    }

    getShapeDrawer(type: string): IShapeDrawer | undefined {
        return this.drawers.get(type);
    }

    getSupportedShapes(): IterableIterator<string> {
        return this.drawers.keys();
    }

    getPathGenerator(type: string): IMovePathGenerator | undefined {
        return this.pathGenerators.get(type);
    }

    addPathGenerator(type: string, pathGenerator: IMovePathGenerator): void {
        if (!this.getPathGenerator(type)) {
            this.pathGenerators.set(type, pathGenerator);
        }
    }

    getInteractors(container: Container, force = false): IInteractor[] {
        let res = this.interactors.get(container);

        if (!res || force) {
            res = [...this.interactorsInitializers.values()].map((t) => t(container));

            this.interactors.set(container, res);
        }

        return res;
    }

    addInteractor(name: string, initInteractor: (container: Container) => IInteractor): void {
        this.interactorsInitializers.set(name, initInteractor);
    }

    getUpdaters(container: Container, force = false): IParticleUpdater[] {
        let res = this.updaters.get(container);

        if (!res || force) {
            res = [...this.updatersInitializers.values()].map((t) => t(container));

            this.updaters.set(container, res);
        }

        return res;
    }

    addParticleUpdater(name: string, initUpdater: (container: Container) => IParticleUpdater): void {
        this.updatersInitializers.set(name, initUpdater);
    }

    getMovers(container: Container, force = false): IParticleMover[] {
        let res = this.movers.get(container);

        if (!res || force) {
            res = [...this.moversInitializers.values()].map((t) => t(container));

            this.movers.set(container, res);
        }

        return res;
    }

    addParticleMover(name: string, initMover: (container: Container) => IParticleMover): void {
        this.moversInitializers.set(name, initMover);
    }
}
