import { ClickMode, ExternalInteractorBase } from "tsparticles-engine";
import type { IModes, Modes, RecursivePartial } from "tsparticles-engine";
import type { IRemoveMode, RemoveContainer, RemoveMode } from "./Types";
import { Remove } from "./Options/Classes/Remove";

/**
 * Particle attract manager
 * @category Interactions
 */
export class Remover extends ExternalInteractorBase<RemoveContainer> {
    handleClickMode: (mode: string) => void;

    constructor(container: RemoveContainer) {
        super(container);

        this.handleClickMode = (mode): void => {
            const container = this.container,
                options = container.actualOptions;

            if (!options.interactivity.modes.remove || mode !== ClickMode.remove) {
                return;
            }

            const removeNb = options.interactivity.modes.remove.quantity;

            container.particles.removeQuantity(removeNb);
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

    loadModeOptions(
        options: Modes & RemoveMode,
        ...sources: RecursivePartial<(IModes & IRemoveMode) | undefined>[]
    ): void {
        if (!options.remove) {
            options.remove = new Remove();
        }

        for (const source of sources) {
            options.remove.load(source?.remove);
        }
    }

    reset(): void {
        // do nothing
    }
}
