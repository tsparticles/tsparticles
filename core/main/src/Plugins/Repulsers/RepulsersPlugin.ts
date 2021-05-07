import type { IPlugin } from "../../Core/Interfaces/IPlugin";
import type { Container } from "../../Core/Container";
import { Repulsers } from "./Repulsers";
import { Utils } from "../../Utils";
import type { RecursivePartial } from "../../Types";
import { RepulserClickMode } from "./Enums";
import type { IRepulserOptions } from "./Options/Interfaces/IRepulserOptions";
import type { IOptions } from "../../Options/Interfaces/IOptions";
import { Options } from "../../Options/Classes/Options";
import { Repulser } from "./Options/Classes/Repulser";

/**
 * @category Repulsers Plugin
 */
class RepulsersPlugin implements IPlugin {
    readonly id;

    constructor() {
        this.id = "repulsers";
    }

    getPlugin(container: Container): Repulsers {
        return new Repulsers(container);
    }

    needsPlugin(options?: RecursivePartial<IOptions & IRepulserOptions>): boolean {
        if (options === undefined) {
            return false;
        }

        const repulsers = options.repulsers;
        let loadRepulsers = false;

        if (repulsers instanceof Array) {
            if (repulsers.length) {
                loadRepulsers = true;
            }
        } else if (repulsers !== undefined) {
            loadRepulsers = true;
        } else if (
            options.interactivity?.events?.onClick?.mode &&
            Utils.isInArray(RepulserClickMode.repulser, options.interactivity.events.onClick.mode)
        ) {
            loadRepulsers = true;
        }

        return loadRepulsers;
    }

    loadOptions(options: Options, source?: RecursivePartial<IOptions & IRepulserOptions>): void {
        if (!this.needsPlugin(options) && !this.needsPlugin(source)) {
            return;
        }

        const optionsCast = (options as unknown) as IRepulserOptions;

        if (source?.repulsers) {
            if (source?.repulsers instanceof Array) {
                optionsCast.repulsers = source?.repulsers.map((s) => {
                    const tmp = new Repulser();

                    tmp.load(s);

                    return tmp;
                });
            } else {
                let repulserOptions = optionsCast.repulsers as Repulser;

                if (repulserOptions?.load === undefined) {
                    optionsCast.repulsers = repulserOptions = new Repulser();
                }

                repulserOptions.load(source?.repulsers);
            }
        }

        const interactivityRepulsers = source?.interactivity?.modes?.repulsers;

        if (interactivityRepulsers) {
            if (interactivityRepulsers instanceof Array) {
                optionsCast.interactivity.modes.repulsers = interactivityRepulsers.map((s) => {
                    const tmp = new Repulser();

                    tmp.load(s);

                    return tmp;
                });
            } else {
                let repulserOptions = optionsCast.interactivity.modes.repulsers as Repulser;

                if (repulserOptions?.load === undefined) {
                    optionsCast.interactivity.modes.repulsers = repulserOptions = new Repulser();
                }

                repulserOptions.load(interactivityRepulsers);
            }
        }
    }
}

const plugin = new RepulsersPlugin();

export type { IRepulserOptions };
export { plugin as RepulsersPlugin };
export * from "./Enums";
