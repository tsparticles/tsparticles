import type { Container, ISourceOptions, Engine } from "@tsparticles/engine";

declare global {
  var tsParticles: Engine;
}

export type ParticlesPluginRegistrar = (engine: Engine) => Promise<void> | void;

let initialized = false;
let initPromise: Promise<void> | undefined;
let initCallback: ParticlesPluginRegistrar | undefined;

export async function initParticlesEngine(init?: ParticlesPluginRegistrar): Promise<void> {
  if (initialized) {
    return;
  }

  if (initPromise) {
    if (initCallback && init && initCallback !== init) {
      throw new Error("initParticlesEngine callback must be stable across the app lifecycle.");
    }

    await initPromise;

    return;
  }

  initCallback = init;
  initPromise = (async () => {
    if (init) {
      await init(globalThis.tsParticles);
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

export class Particles extends HTMLElement {
  get url(): string | null | undefined {
    return this._url;
  }

  set url(value: string | null | undefined) {
    this._url = value;

    this.container.current?.destroy();

    void this.loadParticles(++this.loadId);
  }

  get options(): ISourceOptions | undefined {
    return this._options;
  }

  set options(value: ISourceOptions | undefined) {
    this._options = value;

    this.container.current?.destroy();

    void this.loadParticles(++this.loadId);
  }

  private _options?: ISourceOptions;
  private _url?: string | null;
  private loadId = 0;

  public container: {
    current?: Container;
  };

  constructor() {
    super();

    this.container = {};

    const options = this.getAttribute("options");

    if (options) {
      try {
        this._options = JSON.parse(options);
      } catch {}
    }
    this._url = this.getAttribute("url");

    this.dispatchEvent(
      new CustomEvent("particlesInit", {
        detail: globalThis.tsParticles,
      }),
    );
  }

  connectedCallback() {
    if (!this.isConnected) {
      return;
    }

    void this.loadParticles(++this.loadId);
  }

  disconnectedCallback(): void {
    this.loadId++;
    this.container.current?.destroy();
    this.container.current = undefined;
  }

  private async loadParticles(currentLoadId: number): Promise<void> {
    await waitForParticlesEngineInitialization();

    if (!isParticlesEngineInitialized()) {
      throw new Error("initParticlesEngine(...) must be called once before rendering <web-particles /> components.");
    }

    if (!this.isConnected) {
      return;
    }

    let container: Container | undefined;

    if (this._url) {
      container = await globalThis.tsParticles.load({
        id: this.id,
        element: this,
        url: this._url,
      });
    } else if (this._options) {
      container = await globalThis.tsParticles.load({
        id: this.id,
        element: this,
        options: this._options,
      });
    }

    if (currentLoadId !== this.loadId) {
      container?.destroy();

      return;
    }

    this.notifyParticlesLoaded(container);
  }

  private notifyParticlesLoaded(container?: Container): void {
    this.container.current = container;

    this.dispatchEvent(
      new CustomEvent("particlesLoaded", {
        detail: container,
      }),
    );
  }
}

customElements.define("web-particles", Particles);
