import type { Engine, IOptions, IPlugin, Options, RecursivePartial } from "tsparticles-engine";
import { executeOnSingleOrMultiple, isInArray } from "tsparticles-engine";
import { Absorber } from "./Options/Classes/Absorber";
import { AbsorberClickMode } from "./Enums/AbsorberClickMode";
import type { AbsorberContainer } from "./AbsorberContainer";
import { Absorbers } from "./Absorbers";
import type { IAbsorberOptions } from "./Options/Interfaces/IAbsorberOptions";

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

    loadOptions(options: Options, source?: RecursivePartial<IOptions & IAbsorberOptions>): void {
        if (!this.needsPlugin(options) && !this.needsPlugin(source)) {
            return;
        }

        const optionsCast = options as unknown as IAbsorberOptions;

        optionsCast.absorbers = executeOnSingleOrMultiple(source?.absorbers, (absorber) => {
            const tmp = new Absorber();

            tmp.load(absorber);

            return tmp;
        });

        optionsCast.interactivity.modes.absorbers = executeOnSingleOrMultiple(
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
export * from "./Options/Interfaces/IAbsorberOptions";
