import type { SvelteComponentTyped } from "svelte";
import type { ISourceOptions, Engine, Container } from "tsparticles-engine";

declare module "svelte-particles" {
    type CustomEventWrapper<T> = {
        [K in keyof T]: CustomEvent<T[K]>;
    };
    type ParticlesProps = {
        options?: ISourceOptions;
        url?: string;
        id?: string;
        particlesInit: (engine: Engine) => Promise<void>;
    };
    type ParticlesEvents = CustomEventWrapper<{
        particlesLoaded: {
            particles?: Container;
        };
    }>;
    export default class extends SvelteComponentTyped<ParticlesProps, ParticlesEvents, {}> {
    }
}
