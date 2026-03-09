import type { ISourceOptions, Options } from "@tsparticles/engine";
import type { InteractorType } from "../Enums/InteractorType.js";

/**
 */
export interface IInteractor {
  loadOptions?: (options: Options, ...sources: (ISourceOptions | undefined)[]) => void;

  maxDistance: number;

  type: InteractorType;

  init(): void;
}
