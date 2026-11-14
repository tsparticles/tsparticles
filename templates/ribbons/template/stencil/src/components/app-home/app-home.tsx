import { Component, h } from "@stencil/core";
import { createRibbons } from "@tsparticles/ribbons";
import { engine } from "../../../particlesEngine";
const ribbons = createRibbons(engine);

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
