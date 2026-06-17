import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { initParticlesEngine } from "@tsparticles/lit";
import { ribbons } from "@tsparticles/ribbons";
import { confetti } from "@tsparticles/confetti";

@customElement("my-app")
export class MyApp extends LitElement {
  private fireRibbons(): void {
    ribbons();
  }

  render() {
    return html`
      <div id="app">
        <h1>Ribbons</h1>
        <div class="controls">
          <button @click=${this.fireRibbons}>Fire Ribbons</button>
        </div>
      </div>
    `;
  }
}
