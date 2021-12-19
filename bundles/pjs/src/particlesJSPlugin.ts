import type { IPlugin, IContainerPlugin } from "tsparticles-engine";
import type { Options } from "tsparticles-engine/Options/Classes/Options";
import { fixOptions } from "./fixOptions";

export class ParticlesJSPlugin implements IPlugin {
    readonly id: string;

    constructor() {
        this.id = "particles-js-plugin";
    }

    needsPlugin(): boolean {
        return true;
    }

    getPlugin(): IContainerPlugin {
        return {};
    }

    loadOptions(options: Options): void {
        fixOptions(options);
    }
}
