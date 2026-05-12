import type { IFill, IStroke } from "@tsparticles/engine";

/** The emitter spawn options */
export interface IEmitterSpawn {
  /** The emitter spawn fill */
  fill?: IFill;

  /** The emitter spawn stroke */
  stroke?: IStroke;
}
