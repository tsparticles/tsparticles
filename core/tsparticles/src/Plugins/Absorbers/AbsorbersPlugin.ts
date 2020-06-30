import type { IPlugin } from "../../Core/Interfaces/IPlugin";
import type { Container } from "../../Core/Container";
import { Absorbers } from "./Absorbers";
import { Utils } from "../../Utils";
import { RecursivePartial } from "../../Types/RecursivePartial";
import { AbsorberClickMode } from "./Enums";
import type { IAbsorberOptions } from "./Options/Interfaces/IAbsorberOptions";
import type { IOptions } from "../../Options/Interfaces/IOptions";
import { Options } from "../../Options/Classes/Options";
import { Absorber } from "./Options/Classes/Absorber";

class AbsorbersPlugin implements IPlugin {
    public readonly id: string;

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
            Utils.isInArray(AbsorberClickMode.absorber, options.interactivity.events.onClick.mode)
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
                if (optionsCast.absorbers instanceof Array || optionsCast.absorbers === undefined) {
                    optionsCast.absorbers = new Absorber();
                }

                optionsCast.absorbers.load(source?.absorbers);
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
                if (
                    optionsCast.interactivity.modes.absorbers instanceof Array ||
                    optionsCast.interactivity.modes.absorbers === undefined
                ) {
                    optionsCast.interactivity.modes.absorbers = new Absorber();
                }

                optionsCast.interactivity.modes.absorbers.load(interactivityAbsorbers);
            }
        }
    }
}

const plugin = new AbsorbersPlugin();

export type { IAbsorberOptions };
export { plugin as AbsorbersPlugin };
export * from "./Enums";
