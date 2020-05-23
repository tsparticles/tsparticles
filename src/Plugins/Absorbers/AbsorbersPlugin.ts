import type { IPlugin } from "../../Core/Interfaces/IPlugin";
import type { Container } from "../../Core/Container";
import { Absorbers } from "./Absorbers";
import { Utils } from "../../Utils";
import { ClickMode } from "../../Enums/Modes/ClickMode";
import { IOptions } from "../../Options/Interfaces/IOptions";
import { RecursivePartial } from "../../Types/RecursivePartial";
import { SingleOrMultiple } from "../../Types/SingleOrMultiple";
import { Absorber } from "./Options/Classes/Absorber";
import { IInteractivity } from "../../Options/Interfaces/Interactivity/IInteractivity";
import { IModes } from "../../Options/Interfaces/Interactivity/Modes/IModes";
import { tsParticles } from "../../index.slim";

type AbsorberOptions = IOptions & {
    absorbers: SingleOrMultiple<Absorber>;
    interactivity: IInteractivity & {
        modes: IModes & {
            absorbers: SingleOrMultiple<Absorber>;
        };
    };
};

class AbsorbersPlugin implements IPlugin {
    public readonly id: string;

    constructor() {
        this.id = "absorbers";
    }

    public getPlugin(container: Container): Absorbers {
        return new Absorbers(container);
    }

    public needsPlugin(options?: RecursivePartial<AbsorberOptions>): boolean {
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
            Utils.isInArray(ClickMode.absorber, options.interactivity.events.onClick.mode)
        ) {
            loadAbsorbers = true;
        }

        return loadAbsorbers;
    }
}

tsParticles.addPlugin(new AbsorbersPlugin());
