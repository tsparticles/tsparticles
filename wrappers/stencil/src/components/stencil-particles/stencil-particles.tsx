import { Component, Element, type JSX, Prop, Watch, h } from "@stencil/core";
import { Container, type ISourceOptions, tsParticles } from "@tsparticles/engine";
// ✅ Import the shared type instead of redefining it locally
// Adjust the path to match your actual project structure
import type { ParticlesPluginRegistrar } from "../../initParticlesEngine";

@Component({
  tag: "stencil-particles",
})
export class StencilParticles {
  @Element() private readonly host!: HTMLElement;
  private containerElement?: HTMLDivElement;

  // ✅ Removed `containerId`: loading via `element` avoids ID collisions entirely
  @Prop() options?: ISourceOptions;
  @Prop() url?: string;
  @Prop() init?: ParticlesPluginRegistrar;

  private container?: Container;
  private renderId = 0;

  // ✅ Static flag to prevent redundant `tsParticles.init()` calls
  // when multiple instances of this component are mounted on the same page
  private static engineInitialized = false;

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

    // ✅ Guard clause: `containerElement` is now strictly required
    if (!this.containerElement) {
      console.warn("[stencil-particles] container element not available yet");
      return;
    }

    let container: Container | undefined;

    try {
      if (!StencilParticles.engineInitialized) {
        if (this.init) {
          await this.init(tsParticles);
        }
        await tsParticles.init();
        StencilParticles.engineInitialized = true;
      }

      if (!this.options && !this.url) {
        console.warn("[stencil-particles] neither options nor url provided");
        return;
      }

      // ✅ Load directly onto the DOM element.
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
          // ✅ Ref is actively captured and passed to the engine
          this.containerElement = el as HTMLDivElement;
        }}
        style={{ width: "100%", height: "100%" }}
      ></div>
    );
  }
}
