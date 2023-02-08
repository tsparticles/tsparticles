import type { Container } from "tsparticles-engine";
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
        return new Promise<void>((resolve) => {
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

export async function fireworks(): Promise<FireworksInstance | undefined> {
    await initPlugins();

    const container = await tsParticles.load({ preset: "fireworks" });

    if (!container) {
        return;
    }

    return new FireworksInstance(container);
}
