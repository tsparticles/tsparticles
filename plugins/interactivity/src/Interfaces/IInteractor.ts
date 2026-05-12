import type { ISourceOptions, Options } from "@tsparticles/engine";
import type { InteractorType } from "../Enums/InteractorType.js";

/** Interactor base interface */
export interface IInteractor {
  /** Loads interactor options from source options */
  loadOptions?: (options: Options, ...sources: (ISourceOptions | undefined)[]) => void;

  /** The maximum distance for this interactor */
  maxDistance: number;

  /** The interactor type */
  type: InteractorType;

  /** Initializes the interactor */
  init(): void;
}
