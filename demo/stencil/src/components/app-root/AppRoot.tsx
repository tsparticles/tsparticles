import { Component, type JSX, State, h } from "@stencil/core";
import type { ISourceOptions } from "@tsparticles/engine";
import { defineCustomElements } from "@tsparticles/stencil/loader";

@Component({
  tag: "app-root",
  styleUrl: "app-root.css",
})
export class AppRoot {
  private static elementsDefined = false;
  private readonly options: ISourceOptions = {
    background: {
      color: {
        value: "#0f172a",
      },
    },
    fullScreen: {
      enable: false,
      zIndex: 0,
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: "push",
        },
        onHover: {
          enable: true,
          mode: "repulse",
        },
        resize: {
          enable: true,
        },
      },
      modes: {
        push: {
          quantity: 3,
        },
        repulse: {
          distance: 140,
          duration: 0.4,
        },
      },
    },
    particles: {
      paint: {
        color: {
          value: "#fde68a",
        },
      },
      links: {
        color: "#f8fafc",
        distance: 150,
        enable: true,
        opacity: 0.25,
        width: 1,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: false,
        speed: 2,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          width: 900,
          height: 900,
        },
        value: 80,
      },
      opacity: {
        value: 0.5,
      },
      shape: {
        type: "circle",
      },
      size: {
        value: {
          min: 1,
          max: 4,
        },
      },
    },
    detectRetina: true,
    themes: [
      {
        name: "dark",
        default: {
          value: true,
          auto: false,
        },
      },
      {
        name: "light",
        default: {
          value: false,
          auto: false,
        },
        background: {
          color: {
            value: "#f8fafc",
          },
        },
        particles: {
          paint: {
            color: {
              value: "#0f172a",
            },
          },
        },
      },
    ],
  };
  @State() private engineReady = false;
  @State() private initError?: string;
  @State() private particlesLoaded = false;
  @State() private darkTheme = true;

  private onParticlesLoaded = (): void => {
    this.particlesLoaded = true;
  };

  private toggleTheme = (): void => {
    this.darkTheme = !this.darkTheme;
  };

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
            options={this.options}
            theme={this.darkTheme ? "dark" : "light"}
            onParticlesLoaded={this.onParticlesLoaded}
            //url="/assets/default.json"
            init={async engine => {
              try {
                const { loadSlim } = await import("@tsparticles/slim");
                const { loadThemesPlugin } = await import("@tsparticles/plugin-themes");

                await loadSlim(engine);
                await loadThemesPlugin(engine);
              } catch (error: unknown) {
                const message = error instanceof Error ? error.message : "Unknown initialization error";

                this.initError = message;
                console.error("[stencil-demo] component init failed", error);
              }
            }}
          ></stencil-particles>
        ) : null}
        <button onClick={this.toggleTheme}>
          Switch to {this.darkTheme ? "light" : "dark"} theme
        </button>
        <p>Particles loaded: {this.particlesLoaded ? "yes" : "no"}</p>
      </main>
    );
  }
}
