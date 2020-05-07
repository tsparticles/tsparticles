import type { IPlugin } from "../../Core/Interfaces/IPlugin";
import type { Container } from "../../Core/Container";
import { Utils } from "../../Utils/Utils";
import { ClickMode } from "../../Enums/Modes/ClickMode";
import { Emitters } from "./Emitters";

export class EmittersPlugin implements IPlugin {
    public readonly id: string;

    constructor() {
        this.id = "emitters";
    }

    public getPlugin(container: Container): Emitters {
        return new Emitters(container);
    }

    public needsPlugin(container: Container): boolean {
        const options = container.options;
        const emitters = options.emitters;
        let loadEmitters = false;

        if (emitters instanceof Array) {
            if (emitters.length) {
                loadEmitters = true;
            }
        } else if (emitters !== undefined) {
            loadEmitters = true;
        } else if (Utils.isInArray(ClickMode.absorber, options.interactivity.events.onClick.mode)) {
            loadEmitters = true;
        }

        return loadEmitters;
    }
}
