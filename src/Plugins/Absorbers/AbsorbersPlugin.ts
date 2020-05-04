import type { IPluginManager } from "../../Core/Interfaces/IPluginManager";
import type { Container } from "../../Core/Container";
import { Absorbers } from "./Absorbers";
import { Utils } from "../../Utils/Utils";
import { ClickMode } from "../../Enums/Modes/ClickMode";

export class AbsorbersPlugin implements IPluginManager {
    readonly id: string;

    constructor() {
        this.id = "absorbers";
    }

    getPlugin(container: Container): Absorbers {
        return new Absorbers(container);
    }

    needsPlugin(container: Container): boolean {
        const options = container.options;
        const absorbers = options.absorbers;
        let loadAbsorbers = false;

        if (absorbers instanceof Array) {
            if (absorbers.length) {
                loadAbsorbers = true;
            }
        } else if (absorbers !== undefined) {
            loadAbsorbers = true;
        } else if (Utils.isInArray(ClickMode.absorber, options.interactivity.events.onClick.mode)) {
            loadAbsorbers = true;
        }

        return loadAbsorbers;
    }

}