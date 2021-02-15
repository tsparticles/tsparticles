import type { IPlugin } from "tsparticles-core";
import type { Container } from "tsparticles-core/Core/Container";
import type { RecursivePartial } from "tsparticles-core/Types";
import { Options } from "tsparticles-core/Options/Classes/Options";
import { Main } from "tsparticles-core";
import { InfectionInstance } from "./InfectionInstance";
import { ParticlesInfecter } from "./ParticlesInfecter";
import type { IInfectionOptions } from "./Options/Interfaces/IInfectionOptions";
import { Infection } from "./Options/Classes/Infection";

/**
 * @category Infection Plugin
 */
class Plugin implements IPlugin {
    public readonly id;

    constructor() {
        this.id = "infection";
    }

    public getPlugin(container: Container): InfectionInstance {
        return new InfectionInstance(container);
    }

    public needsPlugin(options?: RecursivePartial<IInfectionOptions>): boolean {
        return options?.infection?.enable ?? false;
    }

    public loadOptions(options: Options, source?: RecursivePartial<IInfectionOptions>): void {
        if (!this.needsPlugin(source)) {
            return;
        }

        const optionsCast = (options as unknown) as IInfectionOptions;
        let infectionOptions = optionsCast.infection as Infection;

        if (infectionOptions?.load === undefined) {
            optionsCast.infection = infectionOptions = new Infection();
        }

        infectionOptions.load(source?.infection);
    }
}

export function loadInfectionPlugin(tsParticles: Main): void {
    const plugin = new Plugin();

    tsParticles.addPlugin(plugin);
    tsParticles.addInteractor("particlesInfection", (container) => new ParticlesInfecter(container));
}
