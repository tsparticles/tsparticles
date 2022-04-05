import { Absorber } from "./Options/Classes/Absorber";
import { AbsorberClickMode } from "./Enums/AbsorberClickMode";
import { Absorbers } from "./Absorbers";
import type { Container } from "../../Core/Container";
import type { Engine } from "../../engine";
import type { IAbsorberOptions } from "./Options/Interfaces/IAbsorberOptions";
import type { IOptions } from "../../Options/Interfaces/IOptions";
import type { IPlugin } from "../../Core/Interfaces/IPlugin";
import { Options } from "../../Options/Classes/Options";
import type { RecursivePartial } from "../../Types/RecursivePartial";
import { isInArray } from "../../Utils/Utils";

/**
 * @category Absorbers Plugin
 */
class AbsorbersPlugin implements IPlugin {
    readonly id;

    constructor() {
        this.id = "absorbers";
    }

    getPlugin(container: Container): Absorbers {
        return new Absorbers(container);
    }

    needsPlugin(options?: RecursivePartial<IOptions & IAbsorberOptions>): boolean {
        if (options === undefined) {
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

export * from "./Enums/AbsorberClickMode";
export * from "./Options/Interfaces/IAbsorberOptions";
