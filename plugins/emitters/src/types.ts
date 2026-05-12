import type { IOptions, Options, SingleOrMultiple } from "@tsparticles/engine";
import type { Emitter } from "./Options/Classes/Emitter.js";
import type { IEmitter } from "./Options/Interfaces/IEmitter.js";

/** Emitter data mode options interface */
export interface IEmitterDataModeOptions {
  /** The random mode options */
  random: IEmitterModeRandomOptions;
  /** The emitter value, single or multiple */
  value: SingleOrMultiple<IEmitter>;
}

/** Random mode options for the emitter */
export interface IEmitterModeRandomOptions {
  /** Number of emitters to pick */
  count: number;
  /** Enables random mode */
  enable: boolean;
}

/** Random mode options class */
export interface EmitterModeRandomOptions {
  /** Number of emitters to pick */
  count: number;
  /** Enables random mode */
  enable: boolean;
}

/** Emitter data mode options */
export interface EmitterDataModeOptions {
  /** Random mode options */
  random: EmitterModeRandomOptions;
  /** Emitter values */
  value: Emitter[];
}

/** Emitter mode options */
export interface EmitterModeOptions {
  /** Emitter data */
  emitters?: EmitterDataModeOptions;
}

/** Emitter mode options interface */
export interface IEmitterModeOptions {
  /** Emitter data */
  emitters?: IEmitterDataModeOptions | SingleOrMultiple<IEmitter>;
}

/** Emitter options type */
export type IEmitterOptions = IOptions & {
  /** The emitters */
  emitters: SingleOrMultiple<IEmitter>;
  /** Interactivity modes */
  interactivity: {
    modes: IEmitterModeOptions;
  };
};

/** Emitter options */
export type EmitterOptions = Options & {
  /** The emitters */
  emitters: SingleOrMultiple<Emitter>;
  /** Interactivity modes */
  interactivity: {
    modes: EmitterModeOptions;
  };
};
