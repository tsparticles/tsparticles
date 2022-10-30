import type { AbsorberOptions, IAbsorberOptions } from "./types";
import type { Engine, IOptions, IPlugin, RecursivePartial } from "tsparticles-engine";
import { executeOnSingleOrMultiple, isInArray } from "tsparticles-engine";
import { Absorber } from "./Options/Classes/Absorber";
import { AbsorberClickMode } from "./Enums/AbsorberClickMode";
import type { AbsorberContainer } from "./AbsorberContainer";
import { Absorbers } from "./Absorbers";

/**
 * @category Absorbers Plugin
 */
class AbsorbersPlugin implements IPlugin {
    readonly id;

    constructor() {
        this.id = "absorbers";
    }

    getPlugin(container: AbsorberContainer): Absorbers {
        return new Absorbers(container);
    }

    loadOptions(options: AbsorberOptions, source?: RecursivePartial<IAbsorberOptions>): void {
        if (!this.needsPlugin(options) && !this.needsPlugin(source)) {
            return;
        }

        if (source?.absorbers) {
            options.absorbers = executeOnSingleOrMultiple(source.absorbers, (absorber) => {
                const tmp = new Absorber();

                tmp.load(absorber);

                return tmp;
            });
        }

        options.interactivity.modes.absorbers = executeOnSingleOrMultiple(
            source?.interactivity?.modes?.absorbers,
            (absorber) => {
                const tmp = new Absorber();

                tmp.load(absorber);

                return tmp;
            }
        );
    }

    needsPlugin(options?: RecursivePartial<IOptions & IAbsorberOptions>): boolean {
        if (!options) {
            return false;
        }

        const absorbers = options.absorbers;

        if (absorbers instanceof Array) {
            return !!absorbers.length;
        } else if (absorbers) {
            return true;
        } else if (
            options.interactivity?.events?.onClick?.mode &&
            isInArray(AbsorberClickMode.absorber, options.interactivity.events.onClick.mode)
        ) {
            return true;
        }

        return false;
    }
}

export async function loadAbsorbersPlugin(engine: Engine): Promise<void> {
    const plugin = new AbsorbersPlugin();

    await engine.addPlugin(plugin);
}

export * from "./AbsorberContainer";
export * from "./Enums/AbsorberClickMode";
