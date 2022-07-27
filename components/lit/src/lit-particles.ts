import { LitElement, html, customElement, property } from "lit-element";
import type { Engine, ISourceOptions } from "tsparticles-engine";
import { tsParticles } from "tsparticles-engine";
import { PropertyValues } from "@lit/reactive-element";

@customElement("lit-particles")
export class LitParticles extends LitElement {
    @property({ type: Object })
    options: ISourceOptions = {};

    @property({ type: String })
    id = "tsparticles";

    @property({ type: Function })
    init: (engine: Engine) => Promise<void> = async (_) => {
        // do nothing
    };

    initialized = false;

    connectedCallback() {
        super.connectedCallback();

        this.init(tsParticles).then(() => {
            this.initialized = true;
        });
    }

    update(changedProperties: PropertyValues) {
        super.update(changedProperties);

        if (this.initialized) {
            tsParticles.load(this.id, this.options);
        }
    }

    render() {
        if (!this.initialized) {
            return html``;
        }

        return html`
            <div id=${this.id}>
                <canvas></canvas>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "lit-particles": LitParticles;
    }
}
