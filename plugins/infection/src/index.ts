import type { Container, Engine, IPlugin, RecursivePartial } from "tsparticles-engine";
import type { IInfectionOptions } from "./Options/Interfaces/IInfectionOptions";
import { Infection } from "./Options/Classes/Infection";
import { InfectionInstance } from "./InfectionInstance";
import { Options } from "tsparticles-engine";
import { ParticlesInfecter } from "./ParticlesInfecter";

/**
 * @category Infection Plugin
 */
class Plugin implements IPlugin {
    readonly id;

    constructor() {
        this.id = "infection";
    }

    getPlugin(container: Container): InfectionInstance {
        return new InfectionInstance(container);
    }

    needsPlugin(options?: RecursivePartial<IInfectionOptions>): boolean {
        return options?.infection?.enable ?? false;
    }

    loadOptions(options: Options, source?: RecursivePartial<IInfectionOptions>): void {
        if (!this.needsPlugin(source)) {
            return;
        }

        const optionsCast = options as unknown as IInfectionOptions;
        let infectionOptions = optionsCast.infection as Infection;

        if (infectionOptions?.load === undefined) {
            optionsCast.infection = infectionOptions = new Infection();
        }

        infectionOptions.load(source?.infection);
    }
}

export async function loadInfectionPlugin(engine: Engine): Promise<void> {
    const plugin = new Plugin();

    await engine.addPlugin(plugin);
    await engine.addInteractor("particlesInfection", (container) => new ParticlesInfecter(container));
}
