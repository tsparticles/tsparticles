import type { Engine, IOptions, IPlugin, Options, RecursivePartial } from "tsparticles-engine";
import { Absorber } from "./Options/Classes/Absorber";
import { AbsorberClickMode } from "./Enums/AbsorberClickMode";
import { AbsorberContainer } from "./AbsorberContainer";
import { Absorbers } from "./Absorbers";
import type { IAbsorberOptions } from "./Options/Interfaces/IAbsorberOptions";
import { isInArray } from "tsparticles-engine";

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

    loadOptions(options: Options, source?: RecursivePartial<IOptions & IAbsorberOptions>): void {
        if (!this.needsPlugin(options) && !this.needsPlugin(source)) {
            return;
        }

        const optionsCast = options as unknown as IAbsorberOptions;

        if (source?.absorbers) {
            if (source?.absorbers instanceof Array) {
                optionsCast.absorbers = source?.absorbers.map((s) => {
                    const tmp = new Absorber();

                    tmp.load(s);

                    return tmp;
                });
            } else {
                let absorberOptions = optionsCast.absorbers as Absorber;

                if (absorberOptions?.load === undefined) {
                    optionsCast.absorbers = absorberOptions = new Absorber();
                }

                absorberOptions.load(source?.absorbers);
            }
        }

        const interactivityAbsorbers = source?.interactivity?.modes?.absorbers;

        if (interactivityAbsorbers) {
            if (interactivityAbsorbers instanceof Array) {
                optionsCast.interactivity.modes.absorbers = interactivityAbsorbers.map((s) => {
                    const tmp = new Absorber();

                    tmp.load(s);

                    return tmp;
                });
            } else {
                let absorberOptions = optionsCast.interactivity.modes.absorbers as Absorber;

                if (absorberOptions?.load === undefined) {
                    optionsCast.interactivity.modes.absorbers = absorberOptions = new Absorber();
                }

                absorberOptions.load(interactivityAbsorbers);
            }
        }
    }
}

export async function loadAbsorbersPlugin(engine: Engine): Promise<void> {
    const plugin = new AbsorbersPlugin();

    await engine.addPlugin(plugin);
}

export * from "./AbsorberContainer";
export * from "./Enums/AbsorberClickMode";
export * from "./Options/Interfaces/IAbsorberOptions";
