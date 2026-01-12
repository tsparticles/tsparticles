import type { Container, IContainerPlugin, IPlugin, RecursivePartial } from "@tsparticles/engine";
import type { IInfectionOptions, InfectionOptions } from "./Types.js";
import { Infection } from "./Options/Classes/Infection.js";

/**
 */
export class InfectionPlugin implements IPlugin {
    readonly id;

    constructor() {
        this.id = "infection";
    }

    async getPlugin(container: Container): Promise<IContainerPlugin> {
        const { InfectionInstance } = await import("./InfectionInstance.js");

        return new InfectionInstance(container);
    }

    loadOptions(options: InfectionOptions, source?: RecursivePartial<IInfectionOptions>): void {
        if (!this.needsPlugin(options) && !this.needsPlugin(source)) {
            return;
        }

        let infectionOptions = options.infection;

        if (infectionOptions?.load === undefined) {
            options.infection = infectionOptions = new Infection();
        }

        infectionOptions.load(source?.infection);
    }

    needsPlugin(options?: RecursivePartial<IInfectionOptions>): boolean {
        return options?.infection?.enable ?? false;
    }
}
