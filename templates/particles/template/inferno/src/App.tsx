import { Component } from "inferno";
import Particles from "@tsparticles/inferno";
import { loadParticles } from "@tsparticles/particles";
import { tsParticles } from "@tsparticles/engine";
import type { ISourceOptions } from "@tsparticles/engine";
import "./App.css";

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

export default class App extends Component {
  componentDidMount() {
    void loadParticles(tsParticles);
  }

  render() {
    return (
      <>
        <div id="app">
          <h1>tsParticles</h1>
        </div>
        <Particles id="tsparticles" options={options} />
      </>
    );
  }
}
