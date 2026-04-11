import type { Container, ISourceOptions, Engine } from "tsparticles-engine";

declare global {
    var tsParticles: Engine;
}

export class Particles extends HTMLElement {
    get url(): string | null | undefined {
        return this._url;
    }

    set url(value: string | null | undefined) {
        this._url = value;

        this.container.current?.destroy();

        globalThis.tsParticles
            .setJSON(this.id, this, this._url ?? undefined)
            .then(container => this.notifyParticlesLoaded(container));
    }

    get options(): ISourceOptions | undefined {
        return this._options;
    }

    set options(value: ISourceOptions | undefined) {
        this._options = value;

        this.container.current?.destroy();

        globalThis.tsParticles.set(this.id, this, this._options).then(container => this.notifyParticlesLoaded(container));
    }

    private _options?: ISourceOptions;
    private _url?: string | null;

    public container: {
        current?: Container;
    };

    constructor() {
        super();

        this.container = {};

        const options = this.getAttribute("options");

        if (options) {
            try {
                this._options = JSON.parse(options);
            } catch {
            }
        }
        this._url = this.getAttribute("url");

        this.dispatchEvent(
            new CustomEvent("particlesInit", {
                detail: globalThis.tsParticles,
            })
        );
    }

    connectedCallback() {
        if (!this.isConnected) {
            return;
        }

        if (this._url) {
            globalThis.tsParticles
                .setJSON(this.id, this, this._url)
                .then(container => this.notifyParticlesLoaded(container));
        } else if (this._options) {
            globalThis.tsParticles
                .set(this.id, this, this._options)
                .then(container => this.notifyParticlesLoaded(container));
        }
    }

    private notifyParticlesLoaded(container?: Container): void {
        this.container.current = container;

        this.dispatchEvent(
            new CustomEvent("particlesLoaded", {
                detail: container,
            })
        );
    }
}

customElements.define("web-particles", Particles);
