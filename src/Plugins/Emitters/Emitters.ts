import type { IContainerPlugin } from "../../Core/Interfaces/IContainerPlugin";
import { Emitter } from "./Emitter";
import type { Container } from "../../Core/Container";
import { ClickMode } from "../../Enums/Modes/ClickMode";
import type { IEmitter } from "../../Options/Interfaces/Emitters/IEmitter";
import { Utils } from "../../Utils/Utils";

export class Emitters implements IContainerPlugin {
    public readonly container: Container;
    public array: Emitter[];

    constructor(container: Container) {
        this.container = container;
        this.array = [];
    }

    public init(): void {
        const container = this.container;
        const options = container.options;

        if (options.emitters instanceof Array) {
            for (const emitterOptions of options.emitters) {
                const emitter = new Emitter(this, emitterOptions);

                this.addEmitter(emitter);
            }
        } else {
            const emitterOptions = options.emitters;
            const emitter = new Emitter(this, emitterOptions);

            this.addEmitter(emitter);
        }
    }

    public play(): void {
        for (const emitter of this.array) {
            emitter.play();
        }
    }

    public pause(): void {
        for (const emitter of this.array) {
            emitter.pause();
        }
    }

    public stop(): void {
        this.array = [];
    }

    public handleClickMode(mode: ClickMode | string): void {
        const container = this.container;
        const options = container.options;

        if (mode === ClickMode.emitter) {
            let emitterModeOptions: IEmitter | undefined;
            const modeEmitters = options.interactivity.modes.emitters;

            if (modeEmitters instanceof Array) {
                if (modeEmitters.length > 0) {
                    emitterModeOptions = Utils.itemFromArray(modeEmitters);
                }
            } else {
                emitterModeOptions = modeEmitters;
            }

            const emitterOptions = emitterModeOptions ?? (options.emitters instanceof Array ?
                Utils.itemFromArray(options.emitters) :
                options.emitters);
            const ePosition = container.interactivity.mouse.clickPosition;
            const emitter = new Emitter(this, Utils.deepExtend({}, emitterOptions), ePosition);

            this.addEmitter(emitter);
        }
    }

    public resize(): void {
        for (const emitter of this.array) {
            emitter.resize();
        }
    }

    public addEmitter(emitter: Emitter): void {
        this.array.push(emitter);
    }

    public removeEmitter(emitter: Emitter): void {
        const index = this.array.indexOf(emitter);

        if (index >= 0) {
            this.array.splice(index, 1);
        }
    }
}
