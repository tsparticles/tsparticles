import type { IPlugin } from "tsparticles-core";
import type { Container } from "tsparticles-core/Core/Container";
import type { RecursivePartial } from "tsparticles-core/Types";
import type { IOptions } from "tsparticles-core/Options/Interfaces/IOptions";
import { Options } from "tsparticles-core/Options/Classes/Options";
import { Main } from "tsparticles-core";
import { InfectionInstance } from "./InfectionInstance";
import { ParticlesInfecter } from "./ParticlesInfecter";

/**
 * @category Infection Plugin
 */
class Plugin implements IPlugin {
    public readonly id;

    constructor(private readonly tsParticles: Main) {
        this.id = "infection";
    }

    public getPlugin(container: Container): InfectionInstance {
        const plugin = new InfectionInstance(container);

        this.tsParticles.addInteractor((container) => new ParticlesInfecter(container, plugin));

        return plugin;
    }

    public needsPlugin(options?: RecursivePartial<IOptions>): boolean {
        return options.infection.enable;
    }

    public loadOptions(options: Options, source?: RecursivePartial<IOptions>): void {
        if (!this.needsPlugin(source)) {
            return;
        }
    }
}

export function loadPlugin(tsParticles: Main) {
    const plugin = new Plugin(tsParticles);

    tsParticles.addPlugin(plugin);
}
