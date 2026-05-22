import { Component, type JSX, Prop, Watch, h } from "@stencil/core";
import { Container, type ISourceOptions, tsParticles } from "@tsparticles/engine";
import type { ParticlesPluginRegistrar } from "../../initParticlesEngine";
import { initParticlesEngine } from "../../initParticlesEngine";

@Component({
  tag: "stencil-particles",
})
export class StencilParticles {
  private containerElement?: HTMLDivElement;

  @Prop() options?: ISourceOptions;
  @Prop() url?: string;
  @Prop() init?: ParticlesPluginRegistrar;

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
  protected async onPropsChange(): Promise<void> {
    await this.loadParticles(++this.renderId);
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
      // tsParticles will auto-generate a unique internal ID, preventing collisions.
      const loadParams = {
        element: this.containerElement,
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
  }

  render(): JSX.Element {
    return (
      <div
        ref={el => {
          this.containerElement = el as HTMLDivElement;
        }}
        style={{ width: "100%", height: "100%" }}
      ></div>
    );
  }
}
