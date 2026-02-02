import {
  ExternalInteractorBase,
  type IInteractivityData,
  type IModes,
  type InteractivityParticle,
  type Modes,
} from "@tsparticles/plugin-interactivity";
import {
  type IParticlesOptions,
  type RecursivePartial,
  deepExtend,
  getRangeValue,
  isInArray,
  itemFromArray,
  itemFromSingleOrMultiple,
} from "@tsparticles/engine";
import type { IPushMode, PushContainer, PushMode } from "./Types.js";
import { Push } from "./Options/Classes/Push.js";

const pushMode = "push",
  minQuantity = 0;

/**
 * Particle attract manager
 */
export class Pusher extends ExternalInteractorBase<PushContainer> {
  handleClickMode: (mode: string, interactivityData: IInteractivityData) => void;

  constructor(container: PushContainer) {
    super(container);

    this.handleClickMode = (mode, interactivityData): void => {
      if (mode !== pushMode) {
        return;
      }

      const container = this.container,
        options = container.actualOptions,
        pushOptions = options.interactivity?.modes.push;

      if (!pushOptions) {
        return;
      }

      const quantity = getRangeValue(pushOptions.quantity);

      if (quantity <= minQuantity) {
        return;
      }

      const group = itemFromArray([undefined, ...pushOptions.groups]),
        groupOptions = group !== undefined ? container.actualOptions.particles.groups[group] : undefined,
        particlesOptions = itemFromSingleOrMultiple(pushOptions.particles),
        overrideOptions = deepExtend(groupOptions, particlesOptions) as RecursivePartial<IParticlesOptions>;

      container.particles.push(quantity, interactivityData.mouse.position, overrideOptions, group);
    };
  }

  clear(): void {
    // do nothing
  }

  init(): void {
    // do nothing
  }

  interact(): void {
    // do nothing
  }

  isEnabled(interactivityData: IInteractivityData, particle?: InteractivityParticle): boolean {
    const container = this.container,
      options = container.actualOptions,
      mouse = interactivityData.mouse,
      events = (particle?.interactivity ?? options.interactivity)?.events;

    return !!events && mouse.clicking && mouse.inside && !!mouse.position && isInArray(pushMode, events.onClick.mode);
  }

  loadModeOptions(options: Modes & PushMode, ...sources: RecursivePartial<(IModes & IPushMode) | undefined>[]): void {
    options.push ??= new Push();

    for (const source of sources) {
      options.push.load(source?.push);
    }
  }

  reset(): void {
    // do nothing
  }
}
