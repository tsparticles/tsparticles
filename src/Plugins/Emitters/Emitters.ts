import type { IContainerPlugin } from "../../Core/Interfaces/IContainerPlugin";
import { EmitterInstance } from "./EmitterInstance";
import type { Container } from "../../Core/Container";
import type { IEmitter } from "./Options/Interfaces/IEmitter";
import { Utils } from "../../Utils";
import type { RecursivePartial } from "../../Types/RecursivePartial";
import { Emitter } from "./Options/Classes/Emitter";
import type { IOptions } from "../../Options/Interfaces/IOptions";
import type { SingleOrMultiple } from "../../Types/SingleOrMultiple";
import { EmitterClickMode } from "./Enums";
import { IEmitterOptions } from "./Options/Interfaces/IEmitterOptions";

export class Emitters implements IContainerPlugin {
    public readonly container: Container;
    public array: EmitterInstance[];
    public emitters: SingleOrMultiple<Emitter>;
    public interactivityEmitters: SingleOrMultiple<Emitter>;

    constructor(container: Container) {
        this.container = container;
        this.array = [];
        this.emitters = [];
        this.interactivityEmitters = [];
    }

    public init(options?: RecursivePartial<IOptions & IEmitterOptions>): void {
        if (!options) {
            return;
        }

        if (options.emitters) {
            if (options.emitters instanceof Array) {
                this.emitters = options.emitters.map((s) => {
                    const tmp = new Emitter();

                    tmp.load(s);

                    return tmp;
                });
            } else {
                if (this.emitters instanceof Array) {
                    this.emitters = new Emitter();
                }

                this.emitters.load(options.emitters);
            }
        }

        const interactivityEmitters = options.interactivity?.modes?.emitters;

        if (interactivityEmitters) {
            if (interactivityEmitters instanceof Array) {
                this.interactivityEmitters = interactivityEmitters.map((s) => {
                    const tmp = new Emitter();

                    tmp.load(s);

                    return tmp;
                });
            } else {
                if (this.interactivityEmitters instanceof Array) {
                    this.interactivityEmitters = new Emitter();
                }

                this.interactivityEmitters.load(interactivityEmitters);
            }
        }

        if (this.emitters instanceof Array) {
            for (const emitterOptions of this.emitters) {
                const emitter = new EmitterInstance(this, emitterOptions);

                this.addEmitter(emitter);
            }
        } else {
            const emitterOptions = this.emitters;
            const emitter = new EmitterInstance(this, emitterOptions);

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

    public handleClickMode(mode: string): void {
        const container = this.container;
        const emitterOptions = this.emitters;
        const modeEmitters = this.interactivityEmitters;

        if (mode === EmitterClickMode.emitter) {
            let emitterModeOptions: IEmitter | undefined;

            if (modeEmitters instanceof Array) {
                if (modeEmitters.length > 0) {
                    emitterModeOptions = Utils.itemFromArray(modeEmitters);
                }
            } else {
                emitterModeOptions = modeEmitters;
            }

            const emittersOptions =
                emitterModeOptions ??
                (emitterOptions instanceof Array ? Utils.itemFromArray(emitterOptions) : emitterOptions);
            const ePosition = container.interactivity.mouse.clickPosition;
            const emitter = new EmitterInstance(this, Utils.deepExtend({}, emittersOptions), ePosition);

            this.addEmitter(emitter);
        }
    }

    public resize(): void {
        for (const emitter of this.array) {
            emitter.resize();
        }
    }

    public addEmitter(emitter: EmitterInstance): void {
        this.array.push(emitter);
    }

    public removeEmitter(emitter: EmitterInstance): void {
        const index = this.array.indexOf(emitter);

        if (index >= 0) {
            this.array.splice(index, 1);
        }
    }
}
