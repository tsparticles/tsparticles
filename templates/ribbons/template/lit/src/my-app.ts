import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { ribbons } from "@tsparticles/ribbons";

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
