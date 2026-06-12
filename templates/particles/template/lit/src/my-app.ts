import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { initParticlesEngine } from "@tsparticles/lit";
import { loadParticles } from "@tsparticles/particles";
import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  background: { color: { value: "#0d0d2b" } },
  fpsLimit: 120,
  particles: {
    number: { value: 80, density: { enable: true } },
    color: { value: "#ffffff" },
    shape: { type: "circle" },
    opacity: { value: 0.5 },
    size: { value: { min: 1, max: 5 } },
    links: { enable: true, distance: 150, color: "#ffffff", opacity: 0.3, width: 1 },
    move: { enable: true, speed: 2, direction: "none", random: false, straight: false, outModes: { default: "bounce" } },
  },
  interactivity: {
    events: { onHover: { enable: true, mode: "repulse" }, onClick: { enable: true, mode: "push" } },
    modes: { repulse: { distance: 100, duration: 0.4 }, push: { quantity: 4 } },
  },
  detectRetina: true,
};

@customElement("my-app")
export class MyApp extends LitElement {
  @state()
  private initialized = false;

  connectedCallback(): void {
    super.connectedCallback();
    void initParticlesEngine(async (engine) => {
      await loadParticles(engine);
      this.initialized = true;
    });
  }

  render() {
    return html`
      <style>
        #app {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 10;
          text-align: center;
          color: #fff;
          font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
          pointer-events: none;
        }
        h1 {
          font-size: 3.2em;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
        }
      </style>
      <div id="app">
        <h1>tsParticles</h1>
      </div>
      ${this.initialized ? html`<lit-particles id="tsparticles" .options=${options}></lit-particles>` : ""}
    `;
  }
}
