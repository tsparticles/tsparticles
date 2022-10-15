import type { IOptions, Options, SingleOrMultiple } from "tsparticles-engine";
import type { Emitter } from "./Options/Classes/Emitter";
import type { IEmitter } from "./Options/Interfaces/IEmitter";

export interface IEmitterModeOptions {
    random: IEmitterModeRandomOptions;
    value: SingleOrMultiple<IEmitter>;
}

export interface IEmitterModeRandomOptions {
    count: number;
    enable: boolean;
}

export interface EmitterModeOptions {
    random: IEmitterModeRandomOptions;
    value: SingleOrMultiple<Emitter>;
}

export type IEmitterOptions = IOptions & {
    emitters: SingleOrMultiple<IEmitter>;
    interactivity: {
        modes: {
            emitters: IEmitterModeOptions | SingleOrMultiple<IEmitter>;
        };
    };
};

export type EmitterOptions = Options & {
    emitters: SingleOrMultiple<Emitter>;
    interactivity: {
        modes: {
            emitters: EmitterModeOptions;
        };
    };
};
