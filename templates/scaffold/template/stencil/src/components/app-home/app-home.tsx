import { Component, type JSX, h } from "@stencil/core";
import type { Engine } from "@tsparticles/engine";
import { engine } from "../../../particlesEngine";
import { loadSlim } from "@tsparticles/slim";

@Component({
  tag: "app-home",
  styleUrl: "app-home.css",
  shadow: true,
})
export class AppHome {
  private async particlesInit(engine: Engine): Promise<void> {
    await loadSlim(engine);
  }

  render(): JSX.Element {
    return (
      <div id="app">
        <h1>Hello, tsParticles!</h1>
        <stencil-particles
          engine={engine}
          container-id="tsparticles"
          init={this.particlesInit.bind(this)}
          options={{
            fullScreen: { enable: true, zIndex: -1 },
            background: { color: { value: "#1a1a2e" } },
            fpsLimit: 60,
            particles: {
              number: { value: 80, density: { enable: true } },
              color: { value: ["#6c5ce7", "#a29bfe", "#fd79a8"] },
              shape: { type: "circle" },
              opacity: { value: 0.5, random: true },
              size: { value: { min: 1, max: 4 }, random: true },
              move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: false,
                straight: false,
                outModes: { default: "out" },
              },
            },
            detectRetina: true,
          }}
        />
      </div>
    );
  }
}
