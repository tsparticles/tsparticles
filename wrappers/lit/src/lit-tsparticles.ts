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

  container?: Container;

  private renderId = 0;

  update(changedProperties: PropertyValues) {
    super.update(changedProperties);

    void this.loadParticles(++this.renderId);
  }

  disconnectedCallback(): void {
    this.renderId++;
    this.container?.destroy();
    this.container = undefined;

    super.disconnectedCallback();
  }

  private async loadParticles(currentRenderId: number): Promise<void> {
    await waitForParticlesEngineInitialization();

    if (!isParticlesEngineInitialized()) {
      throw new Error("initParticlesEngine(...) must be called once before rendering <lit-particles /> components.");
    }

    const id = this.id ?? "tsparticles";

    this.container?.destroy();

    let container: Container | undefined;

    if (this.options) {
      container = await tsParticles.load({ id, options: this.options });
    } else if (this.url) {
      container = await tsParticles.load({ id, url: this.url });
    } else {
      throw new Error("No options or url provided");
    }

    if (currentRenderId !== this.renderId) {
      container?.destroy();

      return;
    }

    this.container = container;
  }

  render() {
    return html`<div id=${this.id}>
      <canvas></canvas>
    </div>`;
  }
}
