import type { Container, Engine, IPlugin, RecursivePartial } from "@tsparticles/engine";
import type { IInfectionOptions, InfectionOptions } from "./Types.js";
import { Infection } from "./Options/Classes/Infection.js";
import type { InfectionInstance } from "./InfectionInstance.js";
import { ParticlesInfecter } from "./ParticlesInfecter.js";

/**
 */
class InfectionPlugin implements IPlugin {
    readonly id;

    constructor() {
        this.id = "infection";
    }

    async getPlugin(container: Container): Promise<InfectionInstance> {
        const { InfectionInstance } = await import("./InfectionInstance.js");

        return new InfectionInstance(container);
    }

    loadOptions(options: InfectionOptions, source?: RecursivePartial<IInfectionOptions>): void {
        if (!this.needsPlugin(options) && !this.needsPlugin(source)) {
            return;
        }

        let infectionOptions = options.infection!;

        if (infectionOptions?.load === undefined) {
            options.infection = infectionOptions = new Infection();
        }

        infectionOptions.load(source?.infection);
    }

    needsPlugin(options?: RecursivePartial<IInfectionOptions>): boolean {
        return options?.infection?.enable ?? false;
    }
}

/**
 * @param engine -
 * @param refresh -
 */
export async function loadInfectionPlugin(engine: Engine, refresh = true): Promise<void> {
    const plugin = new InfectionPlugin();

    await engine.addPlugin(plugin, refresh);
    await engine.addInteractor("particlesInfection", (container) => new ParticlesInfecter(container), refresh);
}

export * from "./Options/Interfaces/IInfection.js";
export * from "./Options/Interfaces/IInfectionStage.js";
