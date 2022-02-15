import type { IContainerPlugin, IPlugin, Options } from "tsparticles-engine";
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
