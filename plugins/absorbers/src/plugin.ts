import type { Container, IOptions, IPlugin, RecursivePartial } from "tsparticles-engine";
import { Absorbers } from "./Absorbers";
import { isInArray, Main } from "tsparticles-engine";
import { AbsorberClickMode } from "./Enums";
import type { IAbsorberOptions } from "./Options/Interfaces/IAbsorberOptions";
import { Options } from "tsparticles-engine/Options/Classes/Options";
import { Absorber } from "./Options/Classes/Absorber";

/**
 * @category Absorbers Plugin
 */
class Plugin implements IPlugin {
    public readonly id;

    constructor() {
        this.id = "absorbers";
    }

    public getPlugin(container: Container): Absorbers {
        return new Absorbers(container);
    }

    public needsPlugin(options?: RecursivePartial<IOptions & IAbsorberOptions>): boolean {
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

    public loadOptions(options: Options, source?: RecursivePartial<IOptions & IAbsorberOptions>): void {
        if (!this.needsPlugin(options) && !this.needsPlugin(source)) {
            return;
        }

        const optionsCast = (options as unknown) as IAbsorberOptions;

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

export type { IAbsorberOptions };
export * from "./Enums";
