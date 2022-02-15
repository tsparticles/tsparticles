import type { IContainerPlugin, IPlugin, Options } from "tsparticles-engine";
import { fixOptions } from "./fixOptions";

export class SlimV1Plugin implements IPlugin {
    readonly id: string;

    constructor() {
        this.id = "slim-v1-plugin";
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
