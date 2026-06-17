import { Component, type JSX, Prop, Watch, Event, EventEmitter, h } from "@stencil/core";
import { Container, type ISourceOptions, tsParticles } from "@tsparticles/engine";
import type { ParticlesPluginRegistrar } from "../../initParticlesEngine";
import { initParticlesEngine } from "../../initParticlesEngine";

@Component({
  tag: "stencil-particles",
})
export class StencilParticles {
  private containerElement?: HTMLDivElement;

  @Event() particlesLoaded!: EventEmitter<Container | undefined>;

  @Prop() options?: ISourceOptions;
  @Prop() url?: string;
  @Prop() init?: ParticlesPluginRegistrar;
  @Prop() containerId?: string;
  @Prop() theme?: string;

  private container?: Container;
  private renderId = 0;

  async componentDidLoad(): Promise<void> {
    await this.loadParticles(++this.renderId);
  }

  disconnectedCallback(): void {
    this.renderId++; // Invalidate any pending load promises
    this.container?.destroy();
    this.container = undefined;
  }

  @Watch("options")
  @Watch("url")
  @Watch("init")
  @Watch("containerId")
  protected async onPropsChange(): Promise<void> {
    await this.loadParticles(++this.renderId);
  }

  @Watch("theme")
  protected async onThemeChange(): Promise<void> {
    if (!this.container) return;
    (this.container as unknown as { loadTheme?: (name?: string) => Promise<void> }).loadTheme?.(this.theme);
  }

  private async loadParticles(currentRenderId: number): Promise<void> {
    this.container?.destroy();

    if (!this.containerElement) {
      console.warn("[stencil-particles] container element not available yet");
      return;
    }

    let container: Container | undefined;

    try {
      // Use the shared initialization logic to ensure consistent plugin registration
      // and avoid duplicate initialization when multiple instances mount concurrently.
      // initParticlesEngine handles promise de-duplication and enforces a stable init callback.
      if (this.init) {
        await initParticlesEngine(this.init);
      }

      if (!this.options && !this.url) {
        console.warn("[stencil-particles] neither options nor url provided");
        return;
      }

      // Load particles directly onto the DOM element.
      // If a container-id is provided, use it so consumers can retrieve the container later.
      const loadParams: Record<string, unknown> = {
        element: this.containerElement,
        ...(this.containerId ? { id: this.containerId } : {}),
        ...(this.options ? { options: this.options } : { url: this.url! }),
      };

      container = await tsParticles.load(loadParams);
    } catch (error: unknown) {
      console.error("[stencil-particles] load failed", error);
      return;
    }

    // Race condition guard: discard result if props changed during async load
    if (currentRenderId !== this.renderId) {
      container?.destroy();
      return;
    }

    this.container = container;

    this.particlesLoaded.emit(container);

    if (container && this.theme) {
      (container as unknown as { loadTheme?: (name?: string) => Promise<void> }).loadTheme?.(this.theme);
    }
  }

  render(): JSX.Element {
    return (
      <div
        id={this.containerId}
        ref={el => {
          this.containerElement = el as HTMLDivElement;
        }}
        style={{ width: "100%", height: "100%" }}
      ></div>
    );
  }
}
