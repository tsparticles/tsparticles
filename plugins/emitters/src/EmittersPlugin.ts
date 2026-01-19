import {
    type Container,
    type IContainerPlugin,
    type IOptions,
    type IPlugin,
    type RecursivePartial,
    executeOnSingleOrMultiple,
    isArray,
    isInArray,
} from "@tsparticles/engine";
import type { EmitterOptions, IEmitterOptions } from "./types.js";
import { Emitter } from "./Options/Classes/Emitter.js";
import { EmitterClickMode } from "./Enums/EmitterClickMode.js";
import type { EmitterContainer } from "./EmitterContainer.js";
import type { EmittersInstancesManager } from "./EmittersInstancesManager.js";

/**
 */
export class EmittersPlugin implements IPlugin {
    readonly id;

    private readonly _instancesManager;

    constructor(instancesManager: EmittersInstancesManager) {
        this._instancesManager = instancesManager;
        this.id = "emitters";
    }

    async getPlugin(container: EmitterContainer): Promise<IContainerPlugin> {
        const { EmittersPluginInstance } = await import("./EmittersPluginInstance.js");

        return new EmittersPluginInstance(this._instancesManager, container);
    }

    loadOptions(_container: Container, options: EmitterOptions, source?: RecursivePartial<IEmitterOptions>): void {
        if (!this.needsPlugin(options) && !this.needsPlugin(source)) {
            return;
        }

        if (source?.emitters) {
            options.emitters = executeOnSingleOrMultiple(source.emitters, emitter => {
                const tmp = new Emitter();

                tmp.load(emitter);

                return tmp;
            });
        }
    }

    needsPlugin(options?: RecursivePartial<IOptions & IEmitterOptions>): boolean {
        if (!options) {
            return false;
        }

        const emitters = options.emitters;

        return (
            (isArray(emitters) && !!emitters.length) ||
            emitters !== undefined ||
            (!!options.interactivity?.events?.onClick?.mode &&
                isInArray(EmitterClickMode.emitter, options.interactivity.events.onClick.mode))
        );
    }
}
