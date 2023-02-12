import type { Container, Engine, IPlugin, RecursivePartial } from "tsparticles-engine";
import type { IInfectionOptions, InfectionOptions } from "./Types";
import { Infection } from "./Options/Classes/Infection";
import { InfectionInstance } from "./InfectionInstance";
import { ParticlesInfecter } from "./ParticlesInfecter";

/**
 * @category Infection Plugin
 */
class InfectionPlugin implements IPlugin {
    readonly id;

    constructor() {
        this.id = "infection";
    }

    getPlugin(container: Container): InfectionInstance {
        return new InfectionInstance(container);
    }

    loadOptions(options: InfectionOptions, source?: RecursivePartial<IInfectionOptions>): void {
        if (!this.needsPlugin(options) && !this.needsPlugin(source)) {
            return;
        }

        let infectionOptions = options.infection as Infection;

        if (infectionOptions?.load === undefined) {
            options.infection = infectionOptions = new Infection();
        }

        infectionOptions.load(source?.infection);
    }

    needsPlugin(options?: RecursivePartial<IInfectionOptions>): boolean {
        return options?.infection?.enable ?? false;
    }
}

export async function loadInfectionPlugin(engine: Engine): Promise<void> {
    const plugin = new InfectionPlugin();

    await engine.addPlugin(plugin);
    await engine.addInteractor("particlesInfection", (container) => new ParticlesInfecter(container));
}

export * from "./Options/Interfaces/IInfection";
export * from "./Options/Interfaces/IInfectionStage";
