import type { ISourceOptions, RecursivePartial } from "tsparticles";
import { Container, tsParticles } from "tsparticles";

export class Particles extends HTMLElement {
    get url(): string {
        return this._url;
    }

    set url(value: string) {
        this._url = value;

        this.container.current?.destroy();

        tsParticles.setJSON(this.id, this, this._url).then(container => this.notifyParticlesLoaded(container));
    }

    get options(): RecursivePartial<ISourceOptions> {
        return this._options;
    }

    set options(value: RecursivePartial<ISourceOptions>) {
        this._options = value;

        this.container.current?.destroy();

        tsParticles.set(this.id, this, this._options).then(container => this.notifyParticlesLoaded(container));
    }

    private _options: RecursivePartial<ISourceOptions>;
    private _url: string;

    public container: {
        current?: Container
    };

    constructor() {
        super();

        this.container = {};
        this.attachShadow({ mode: "open" });

        const options = this.getAttribute("options");
        const url = this.getAttribute("url");

        this.dispatchEvent(new CustomEvent("particlesInit", {
            detail: tsParticles
        }));

        if (url) {
            tsParticles.setJSON(this.id, this, url).then(container => this.notifyParticlesLoaded(container));
        } else if (options) {
            tsParticles.set(this.id, this, JSON.parse(options)).then(container => this.notifyParticlesLoaded(container));
        }
    }

    private notifyParticlesLoaded(container?: Container): void {
        this.container.current = container;

        this.dispatchEvent(new CustomEvent("particlesLoaded", {
            detail: container
        }));
    }
}

customElements.define("particles", Particles);
