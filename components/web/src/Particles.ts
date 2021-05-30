import type { ISourceOptions, RecursivePartial } from "tsparticles";
import { tsParticles } from "tsparticles";

export class Particles extends HTMLElement {
    get url(): string {
        return this._url;
    }

    set url(value: string) {
        this._url = value;

        tsParticles.setJSON(this.id, this, this._url);
    }

    get options(): RecursivePartial<ISourceOptions> {
        return this._options;
    }

    set options(value: RecursivePartial<ISourceOptions>) {
        this._options = value;

        tsParticles.set(this.id, this, this._options);
    }

    private _options: RecursivePartial<ISourceOptions>;
    private _url: string;

    constructor() {
        super();

        this.attachShadow({ mode: "open" });

        const options = this.getAttribute("options");
        const url = this.getAttribute("url");

        if (url) {
            tsParticles.setJSON(this.id, this, url);
        } else if (options) {
            tsParticles.set(this.id, this, JSON.parse(options));
        }
    }
}

customElements.define("particles", Particles);
