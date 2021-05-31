import type { ISourceOptions, RecursivePartial } from "tsparticles";
import type { Container, Main } from "tsparticles";

declare global {
    interface Window {
        tsParticles: Main;
    }
}

export class Particles extends HTMLElement {
    get url(): string | undefined {
        return this._url;
    }

    set url(value: string | undefined) {
        this._url = value;

        this.container.current?.destroy();

        window.tsParticles.setJSON(this.id, this, this._url).then(container => this.notifyParticlesLoaded(container));
    }

    get options(): RecursivePartial<ISourceOptions> | undefined {
        return this._options;
    }

    set options(value: RecursivePartial<ISourceOptions> | undefined) {
        this._options = value;

        this.container.current?.destroy();

        window.tsParticles.set(this.id, this, this._options).then(container => this.notifyParticlesLoaded(container));
    }

    private _options?: RecursivePartial<ISourceOptions>;
    private _url?: string;

    public container: {
        current?: Container
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

        this.dispatchEvent(new CustomEvent("particlesInit", {
            detail: window.tsParticles
        }));
    }

    connectedCallback() {
        if (!this.isConnected) {
            return;
        }

        if (this._url) {
            window.tsParticles.setJSON(this.id, this, this._url).then(container => this.notifyParticlesLoaded(container));
        } else if (this._options) {
            window.tsParticles.set(this.id, this, this._options).then(container => this.notifyParticlesLoaded(container));
        }
    }

    private notifyParticlesLoaded(container?: Container): void {
        this.container.current = container;

        this.dispatchEvent(new CustomEvent("particlesLoaded", {
            detail: container
        }));
    }
}

customElements.define("web-particles", Particles);
