import { LitElement, html, PropertyValues } from "lit";
import { property, customElement } from "lit/decorators.js";
import { Container, Engine, ISourceOptions, tsParticles } from "@tsparticles/engine";

export type ParticlesPluginRegistrar = (engine: Engine) => Promise<void> | void;

let initialized = false;
let initPromise: Promise<void> | undefined;
let initCallback: ParticlesPluginRegistrar | undefined;

export async function initParticlesEngine(init?: ParticlesPluginRegistrar): Promise<void> {
  if (initialized) {
    return;
  }

  if (initPromise) {
    if (initCallback !== init) {
      throw new Error("initParticlesEngine callback must be stable across the app lifecycle.");
    }

    await initPromise;

    return;
  }

  initCallback = init;
  initPromise = (async () => {
    if (init) {
      await init(tsParticles);
    }

    if (typeof (tsParticles as any).init === "function") {
      await (tsParticles as any).init();
    }

    initialized = true;
  })().catch((error: unknown) => {
    initPromise = undefined;
    initCallback = undefined;
    initialized = false;

    throw error;
  });

  await initPromise;
}

export function isParticlesEngineInitialized(): boolean {
  return initialized;
}

export async function waitForParticlesEngineInitialization(): Promise<void> {
  await (initPromise ?? Promise.resolve());
}

/**
 * The LitParticles element.
 *
 * @id - This element has an id
 */
@customElement("lit-particles")
export class LitParticles extends LitElement {
  /**
   * Render into light DOM so tsParticles can find the container element by id.
   * @returns The result
   */
  createRenderRoot(): HTMLElement {
    return this;
  }

  /**
   * The container id
   */
  @property({ type: String })
  id = "tsparticles";

  /**
   * The options
   */
  @property({ type: Object })
  options?: ISourceOptions;

  /**
   * The url
   */
  @property({ type: String })
  url?: string;

  /**
   * The theme name (requires @tsparticles/plugin-themes)
   */
  @property({ type: String })
  theme?: string;

  container?: Container;

  #firstUpdate = true;

  #renderId = 0;

  update(changedProperties: PropertyValues) {
    super.update(changedProperties);

    if (this.#firstUpdate || changedProperties.has("options") || changedProperties.has("url") || changedProperties.has("id")) {
      this.#firstUpdate = false;

      void this.#loadParticles(++this.#renderId);
    }

    if (changedProperties.has("theme") && this.container) {
      (this.container as unknown as { loadTheme?: (name?: string) => Promise<void> }).loadTheme?.(this.theme);
    }
  }

  disconnectedCallback(): void {
    this.#renderId++;
    this.container?.destroy();
    this.container = undefined;

    super.disconnectedCallback();
  }

  async #loadParticles(currentRenderId: number): Promise<void> {
    await waitForParticlesEngineInitialization();

    if (!isParticlesEngineInitialized()) {
      throw new Error("initParticlesEngine(...) must be called once before rendering <lit-particles /> components.");
    }

    const id = this.id ?? "tsparticles";

    this.container?.destroy();

    let container: Container | undefined;

    if (this.options) {
      container = await tsParticles.load({ id, element: this, options: this.options });
    } else if (this.url) {
      container = await tsParticles.load({ id, element: this, url: this.url });
    } else {
      throw new Error("No options or url provided");
    }

    if (currentRenderId !== this.#renderId) {
      container?.destroy();

      return;
    }

    this.container = container;

    if (container) {
      if (this.theme) {
        (container as unknown as { loadTheme?: (name?: string) => Promise<void> }).loadTheme?.(this.theme);
      }

      this.dispatchEvent(
        new CustomEvent("particlesLoaded", {
          detail: container,
          bubbles: true,
          composed: true,
        }),
      );
    }
  }

  render() {
    return html`<div id=${this.id}>
      <canvas></canvas>
    </div>`;
  }
}
