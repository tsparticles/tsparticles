import { ClickMode, ExternalInteractorBase } from "tsparticles-engine";
import type { IModes, Modes, RecursivePartial } from "tsparticles-engine";
import type { IPushMode, PushContainer, PushMode } from "./Types";
import { Push } from "./Options/Classes/Push";
import { itemFromArray } from "tsparticles-engine";

/**
 * Particle attract manager
 * @category Interactions
 */
export class Pusher extends ExternalInteractorBase<PushContainer> {
    handleClickMode: (mode: string) => void;

    constructor(container: PushContainer) {
        super(container);

        this.handleClickMode = (mode): void => {
            if (mode !== ClickMode.push) {
                return;
            }

            const container = this.container,
                options = container.actualOptions,
                pushOptions = options.interactivity.modes.push;

            if (!pushOptions) {
                return;
            }

            const pushNb = pushOptions.quantity;

            if (pushNb <= 0) {
                return;
            }

            const group = itemFromArray([undefined, ...pushOptions.groups]),
                groupOptions = group !== undefined ? container.actualOptions.particles.groups[group] : undefined;

            container.particles.push(pushNb, container.interactivity.mouse, groupOptions, group);
        };
    }

    clear(): void {
        // do nothing
    }

    init(): void {
        // do nothing
    }

    async interact(): Promise<void> {
        // do nothing
    }

    isEnabled(): boolean {
        return true;
    }

    loadModeOptions(options: Modes & PushMode, ...sources: RecursivePartial<(IModes & IPushMode) | undefined>[]): void {
        if (!options.push) {
            options.push = new Push();
        }

        for (const source of sources) {
            options.push.load(source?.push);
        }
    }

    reset(): void {
        // do nothing
    }
}
