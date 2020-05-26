import type { IPlugin } from "../../Core/Interfaces/IPlugin";
import type { Container } from "../../Core/Container";
import { Absorbers } from "./Absorbers";
import { Utils } from "../../Utils";
import { RecursivePartial } from "../../Types/RecursivePartial";
import { tsParticles } from "../../index.slim";
import { AbsorberClickMode } from "./Enums";
import { IAbsorberOptions } from "./Options/Interfaces/IAbsorberOptions";
import { IOptions } from "../../Options/Interfaces/IOptions";

class AbsorbersPlugin implements IPlugin {
    public readonly id: string;

    constructor() {
        this.id = "absorbers";
    }

    public getPlugin(container: Container): Absorbers {
        return new Absorbers(container);
    }

    public needsPlugin(options?: RecursivePartial<IOptions & IAbsorberOptions>): boolean {
        if (!options?.absorbers) {
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
}

const plugin = new AbsorbersPlugin();

tsParticles.addPlugin(plugin);

export { IAbsorberOptions, plugin as AbsorbersPlugin };
export * from "./Enums";
