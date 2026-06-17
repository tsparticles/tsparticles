import { Component, h } from "@stencil/core";
import { ribbons } from "@tsparticles/ribbons";

@Component({
  tag: "app-home",
})
export class AppHome {
  private fireRibbons(): void {
    ribbons();
  }

  render() {
    return (
      <div id="app">
        <h1>Ribbons</h1>
        <div class="controls">
          <button onClick={() => this.fireRibbons()}>Fire Ribbons</button>
        </div>
      </div>
    );
  }
}
