import type { IPlugin } from "../../Core/Interfaces";
import type { Container } from "../../Core/Container";
import { Absorbers } from "./Absorbers";
import type { RecursivePartial } from "../../Types";
import { AbsorberClickMode } from "./Enums";
import type { IAbsorberOptions } from "./Options/Interfaces/IAbsorberOptions";
import type { IOptions } from "../../Options/Interfaces/IOptions";
import { Options } from "../../Options/Classes/Options";
import { Absorber } from "./Options/Classes/Absorber";
import { isInArray } from "../../Utils";
import type { Main } from "../../main";

/**
 * @category Absorbers Plugin
 */
class Plugin implements IPlugin {
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
        let loadAbsorbers = false;

        if (absorbers instanceof Array) {
            if (absorbers.length) {
                loadAbsorbers = true;
            }
        } else if (absorbers !== undefined) {
            loadAbsorbers = true;
        } else if (
            options.interactivity?.events?.onClick?.mode &&
            isInArray(AbsorberClickMode.absorber, options.interactivity.events.onClick.mode)
        ) {
            loadAbsorbers = true;
        }

        return loadAbsorbers;
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

export function loadAbsorbersPlugin(tsParticles: Main): void {
    const plugin = new Plugin();

    tsParticles.addPlugin(plugin);
}
