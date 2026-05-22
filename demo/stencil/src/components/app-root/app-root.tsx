import type { JSX } from "@stencil/core";
import { Component, h, State } from "@stencil/core";
import { loadSlim } from "@tsparticles/slim";
import { defineCustomElements } from "@tsparticles/stencil/loader";

@Component({
  tag: "app-root",
  styleUrl: "app-root.css"
})
export class AppRoot {
  private static elementsDefined = false;
  @State() private engineReady = false;
  @State() private initError?: string;

  componentWillLoad(): void {
    if (!AppRoot.elementsDefined) {
      defineCustomElements();
      AppRoot.elementsDefined = true;
    }

    this.engineReady = true;
  }

  render(): JSX.Element {
    return (
      <main>
        <h1>tsParticles + Stencil</h1>
        <p class="status">{this.engineReady ? "Engine ready" : "Initializing engine..."}</p>
        {this.initError ? <p class="error">Init error: {this.initError}</p> : null}
        {this.engineReady ? (
          <stencil-particles
            container-id="tsparticles"
            url="/assets/default.json"
            init={async engine => {
              try {
                await loadSlim(engine);
              } catch (error: unknown) {
                const message = error instanceof Error ? error.message : "Unknown initialization error";

                this.initError = message;
                console.error("[stencil-demo] component init failed", error);
              }
            }}
          ></stencil-particles>
        ) : null}
      </main>
    );
  }
}
