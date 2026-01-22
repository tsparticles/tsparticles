import type { IOptions, Options, SingleOrMultiple } from "@tsparticles/engine";
import type { Emitter } from "./Options/Classes/Emitter.js";
import type { IEmitter } from "./Options/Interfaces/IEmitter.js";

export interface IEmitterDataModeOptions {
  random: IEmitterModeRandomOptions;
  value: SingleOrMultiple<IEmitter>;
}

export interface IEmitterModeRandomOptions {
  count: number;
  enable: boolean;
}

export interface EmitterModeRandomOptions {
  count: number;
  enable: boolean;
}

export interface EmitterDataModeOptions {
  random: EmitterModeRandomOptions;
  value: Emitter[];
}

export interface EmitterModeOptions {
  emitters?: EmitterDataModeOptions;
}

export interface IEmitterModeOptions {
  emitters?: IEmitterDataModeOptions | SingleOrMultiple<IEmitter>;
}

export type IEmitterOptions = IOptions & {
  emitters: SingleOrMultiple<IEmitter>;
  interactivity: {
    modes: IEmitterModeOptions;
  };
};

export type EmitterOptions = Options & {
  emitters: SingleOrMultiple<Emitter>;
  interactivity: {
    modes: EmitterModeOptions;
  };
};
