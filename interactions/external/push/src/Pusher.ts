import {
    ExternalInteractorBase,
    type IModes,
    type IParticlesOptions,
    type Modes,
    type RecursivePartial,
    deepExtend,
    getRangeValue,
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
    handleClickMode: (mode: string) => void;

    constructor(container: PushContainer) {
        super(container);

        this.handleClickMode = (mode): void => {
            if (mode !== pushMode) {
                return;
            }

            const container = this.container,
                options = container.actualOptions,
                pushOptions = options.interactivity.modes.push;

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

            container.particles.push(quantity, container.interactivity.mouse, overrideOptions, group);
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

    isEnabled(): boolean {
        return true;
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
