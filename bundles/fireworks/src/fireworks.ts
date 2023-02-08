import type { Container, RecursivePartial } from "tsparticles-engine";
import { FireworkOptions } from "./FireworkOptions";
import type { IFireworkOptions } from "./IFireworkOptions";
import { loadFireworksPreset } from "tsparticles-preset-fireworks";
import { tsParticles } from "tsparticles-engine";

let initialized = false;
let initializing = false;

class FireworksInstance {
    private readonly _container: Container;

    constructor(container: Container) {
        this._container = container;
    }

    pause(): void {
        this._container.pause();
    }

    play(): void {
        this._container.play();
    }

    stop(): void {
        this._container.stop();
    }
}

async function initPlugins(): Promise<void> {
    if (initialized) {
        return;
    }

    if (initializing) {
        return new Promise<void>(resolve => {
            const interval = setInterval(() => {
                if (initialized) {
                    clearInterval(interval);
                    resolve();
                }
            }, 100);
        });
    }

    initializing = true;

    await loadFireworksPreset(tsParticles);

    initializing = false;
    initialized = true;
}

export async function fireworks(
    idOrOptions: string | RecursivePartial<IFireworkOptions>,
    sourceOptions?: RecursivePartial<IFireworkOptions>
): Promise<FireworksInstance | undefined> {
    await initPlugins();

    let id: string;

    const options = new FireworkOptions();

    if (typeof idOrOptions === "string") {
        id = idOrOptions;
        options.load(sourceOptions);
    } else {
        id = "fireworks";
        options.load(idOrOptions);
    }

    const container = await tsParticles.load(id, { preset: "fireworks" });

    if (!container) {
        return;
    }

    return new FireworksInstance(container);
}
