import {
    ExternalInteractorBase,
    type IInteractivityData,
    type IModes,
    type Modes,
    type RecursivePartial,
    getRangeValue,
} from "@tsparticles/engine";
import type { IRemoveMode, RemoveContainer, RemoveMode } from "./Types.js";
import { Remove } from "./Options/Classes/Remove.js";

const removeMode = "remove";

/**
 * Particle attract manager
 */
export class Remover extends ExternalInteractorBase<RemoveContainer> {
    handleClickMode: (mode: string, interactivityData: IInteractivityData) => void;

    constructor(container: RemoveContainer) {
        super(container);

        this.handleClickMode = (mode): void => {
            const container = this.container,
                options = container.actualOptions;

            if (!options.interactivity.modes.remove || mode !== removeMode) {
                return;
            }

            const removeNb = getRangeValue(options.interactivity.modes.remove.quantity);

            container.particles.removeQuantity(removeNb);
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

    loadModeOptions(
        options: Modes & RemoveMode,
        ...sources: RecursivePartial<(IModes & IRemoveMode) | undefined>[]
    ): void {
        options.remove ??= new Remove();

        for (const source of sources) {
            options.remove.load(source?.remove);
        }
    }

    reset(): void {
        // do nothing
    }
}
