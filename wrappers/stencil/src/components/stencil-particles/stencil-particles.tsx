import type { JSX } from "@stencil/core";
import { Component, Element, h, Prop, Watch } from "@stencil/core";
import { Container, Engine, type ISourceOptions, tsParticles } from "@tsparticles/engine";

export type ParticlesPluginRegistrar = (engine: Engine) => Promise<void> | void;

@Component({
  tag: "stencil-particles"
})
export class StencilParticles {
  @Element() private host!: HTMLElement;
  private containerElement?: HTMLDivElement;

  @Prop({ attribute: "container-id" }) containerId = "tsparticles";
  @Prop() options?: ISourceOptions;
  @Prop() url?: string;
  @Prop() init?: ParticlesPluginRegistrar;

  private container?: Container;
  private renderId = 0;
  private initialized = false;

  async componentDidLoad(): Promise<void> {
    await this.loadParticles(++this.renderId);
  }

  disconnectedCallback(): void {
    this.renderId++;
    this.container?.destroy();
    this.container = undefined;
  }

  @Watch("containerId")
  @Watch("options")
  @Watch("url")
  @Watch("init")
  protected async onPropsChange(): Promise<void> {
    await this.loadParticles(++this.renderId);
  }

  private async loadParticles(currentRenderId: number): Promise<void> {
    this.container?.destroy();

    let container: Container | undefined;

    try {
      if (!this.initialized) {
        if (this.init) {
          await this.init(tsParticles);
        }

        await tsParticles.init();

        this.initialized = true;
      }

      if (this.options) {
        container = await tsParticles.load({
          id: this.containerId ?? "tsparticles",
          options: this.options
        });
      } else if (this.url) {
        container = await tsParticles.load({
          id: this.containerId ?? "tsparticles",
          url: this.url
        });
      } else {
        console.warn("[stencil-particles] neither options nor url provided");

        return;
      }
    } catch (error: unknown) {
      console.error("[stencil-particles] load failed", error);

      return;
    }

    if (currentRenderId !== this.renderId) {
      container?.destroy();

      return;
    }

    this.container = container;

    console.info("[stencil-particles] loaded", {
      id: this.containerId,
      hasCanvas: !!(this.containerElement?.querySelector("canvas") || document.querySelector(`#${this.containerId} canvas`))
    });
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
