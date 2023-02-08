import type { IOptionLoader, RecursivePartial } from "tsparticles-engine";
import type { IFireworkOptions } from "./IFireworkOptions";

export class FireworkOptions implements IFireworkOptions, IOptionLoader<IFireworkOptions> {
    constructor() {}

    load(data?: RecursivePartial<IFireworkOptions>): void {
        if (!data) {
            return;
        }
    }
}
