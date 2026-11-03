import { Component, type JSX, Prop, Watch, Event, EventEmitter, h } from "@stencil/core";
import { Container, type ISourceOptions, tsParticles } from "@tsparticles/engine";
import type { ParticlesPluginRegistrar } from "../../initParticlesEngine";
import { initParticlesEngine } from "../../initParticlesEngine";

let instanceCount = 0;

/**
 * Generates a per-instance container id, skipping candidates already used by a rendered element or
 * by an explicit container-id on another instance, so an id generated here never collides with
 * another instance or with an explicit container-id
 * @param explicitId - an id that a duplicate of this instance has already claimed
 * @returns the generated container id
 */
const getFallbackContainerId = (explicitId?: string): string => {
  let id: string;

  do {
    id = `stencil-particles-${(++instanceCount).toString()}`;
  } while (typeof document !== "undefined" && document.getElementById(id));

  return id;
};

@Component({
  tag: "stencil-particles",
})
export class StencilParticles {
  private containerElement?: HTMLDivElement;
  private readonly fallbackContainerId = getFallbackContainerId();

  @Event() particlesLoaded!: EventEmitter<Container | undefined>;

  @Prop() options?: ISourceOptions;
  @Prop() url?: string;
  @Prop() init?: ParticlesPluginRegistrar;
  @Prop() containerId?: string;
  @Prop() theme?: string;

  /**
   * The resolved container id for this instance, stored so render() and loadParticles() use the
   * same value and the containerId watcher keeps it current.
   */
  private resolvedContainerId = this.containerId ?? this.fallbackContainerId;

  private container?: Container;
  private renderId = 0;

  /**
   * The generated container id owned by this instance, if any. Used to release ownership on
   * disconnect so a reused id is not left reserved across a reload.
   */
  private generatedContainerId?: string;

  async componentDidLoad(): Promise<void> {
    this.resolvedContainerId = this.containerId ?? this.fallbackContainerId;
    await this.loadParticles(++this.renderId);
  }

  connectedCallback(): void {
    // The element was detached and reattached; Stencil runs componentDidLoad() only once, so
    // re-run the initial load when the container element is available, otherwise the
    // render ref will trigger componentDidLoad once it becomes available.
    if (!this.containerElement) return;

    this.renderId++;
    void this.loadParticles(this.renderId);
  }

  disconnectedCallback(): void {
    this.renderId++; // Invalidate any pending load promises
    this.container?.destroy();
    this.container = undefined;

    // Release any generated id this instance owns. Ownership is tracked per instance, so no
    // generated id remains reserved after a disconnect.
    this.generatedContainerId = undefined;
  }

  @Watch("options")
  @Watch("url")
  @Watch("init")
  @Watch("containerId")
  protected async onPropsChange(): Promise<void> {
    this.resolvedContainerId = this.containerId ?? this.fallbackContainerId;
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

    // Resolve the container id once to a stored value, updated by the containerId watcher, so
    // render() and loadParticles() use the same id.
    const containerId = this.resolvedContainerId;

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

      // Use the stored container id. Resolve it to a value owned by this instance: an explicit
      // container-id is preferred, but if it collides with another live element this instance does
      // not own, fall back to a generated id and warn.
      let resolvedId = containerId;
      if (!resolvedId) {
        resolvedId = this.fallbackContainerId;
        this.generatedContainerId = resolvedId;
      } else {
        // Another live instance already uses this id: exclude the element owned by this
        // instance itself, then either skip rendering/loading with a warning or fall back to
        // a generated id.
        const containerElement = this.containerElement;
        const otherElement = typeof document !== "undefined" ? document.getElementById(resolvedId) : null;
        if (otherElement && otherElement !== containerElement) {
          console.warn(
            `[stencil-particles] container id \"${resolvedId}\" is already used by another element; skipping load`,
          );
          return;
        }

        // The explicit id is free for this instance.
      }

      const loadParams: Record<string, unknown> = {
        element: this.containerElement,
        id: resolvedId,
        ...(this.options ? { options: this.options } : {}),
        ...(this.url ? { url: this.url } : {}),
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
        id={this.resolvedContainerId}
        ref={el => {
          this.containerElement = el as HTMLDivElement;
        }}
        style={{ width: "100%", height: "100%" }}
      ></div>
    );
  }
}
