import { LitElement, html, PropertyValues } from "lit";
import { property, customElement } from "lit/decorators.js";
import {
  Container,
  Engine,
  ISourceOptions,
  tsParticles,
} from "tsparticles-engine";

/**
 * The LitParticles element.
 *
 * @id - This element has an id
 */
@customElement("lit-particles")
export class LitParticles extends LitElement {
  /**
   * The container id
   */
  @property({ type: String })
  id = "tsparticles";

  /**
   * The options
   */
  @property({ type: Object })
  options?: ISourceOptions;

  /**
   * The url
   */
  @property({ type: String })
  url?: string;

  container?: Container;

  update(changedProperties: PropertyValues) {
    super.update(changedProperties);

    const id = this.id ?? "tsparticles";

    if (this.options) {
      tsParticles.load(id, this.options);
    } else if (this.url) {
      tsParticles.loadJSON(id, this.url);
    } else {
      throw new Error("No options or url provided");
    }
  }

  render() {
    return html`<div id=${this.id}>
      <canvas></canvas>
    </div>`;
  }
}
