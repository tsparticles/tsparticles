import type { IPlugin } from "../../Core/Interfaces/IPlugin";
import type { Container } from "../../Core/Container";
import { Utils } from "../../Utils";
import { ClickMode } from "../../Enums/Modes/ClickMode";
import { Emitters } from "./Emitters";
import { RecursivePartial } from "../../Types/RecursivePartial";
import { IOptions } from "../../Options/Interfaces/IOptions";
import { SingleOrMultiple } from "../../Types/SingleOrMultiple";
import { Emitter } from "./Options/Classes/Emitter";

type EmitterOptions = IOptions & {
    emitters: SingleOrMultiple<Emitter>;
};

export class EmittersPlugin implements IPlugin {
    public readonly id: string;

    constructor() {
        this.id = "emitters";
    }

    public getPlugin(container: Container): Emitters {
        return new Emitters(container);
    }

    public needsPlugin(options?: RecursivePartial<EmitterOptions>): boolean {
        if (!options?.emitters) {
            return false;
        }

        const emitters = options.emitters;
        let loadEmitters = false;

        if (emitters instanceof Array) {
            if (emitters.length) {
                loadEmitters = true;
            }
        } else if (emitters !== undefined) {
            loadEmitters = true;
        } else if (
            options.interactivity?.events?.onClick?.mode &&
            Utils.isInArray(ClickMode.absorber, options.interactivity.events.onClick.mode)
        ) {
            loadEmitters = true;
        }

        return loadEmitters;
    }
}
