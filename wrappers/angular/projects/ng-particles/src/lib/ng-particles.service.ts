import type { Engine } from "@tsparticles/engine";
import { Injectable } from "@angular/core";

export type ParticlesPluginRegistrar = (engine: Engine) => Promise<void> | void;

@Injectable({
  providedIn: "root",
})
export class NgParticlesService {
  #engine?: Engine;
  #initialized = false;
  #initPromise?: Promise<void>;
  #initCallback?: ParticlesPluginRegistrar;

  public get engine(): Engine {
    if (!this.#engine) {
      throw new Error("Configure NgParticlesService.init(engine, init) first.");
    }
    return this.#engine;
  }

  public get loaded(): boolean {
    return this.#initialized;
  }

  public assertInitialized(): void {
    if (!this.#initialized) {
      throw new Error("NgParticlesService.init(...) must be called once before rendering ngx-particles components.");
    }
  }

  public async init(engine: Engine, particlesInit?: ParticlesPluginRegistrar): Promise<void> {
    if (this.#engine && this.#engine !== engine) {
      throw new Error("Use a separate NgParticlesService provider for each engine.");
    }
    this.#engine = engine;
    if (this.#initialized) {
      return;
    }

    if (this.#initPromise) {
      if (this.#initCallback !== particlesInit) {
        throw new Error("NgParticlesService init callback must be stable across the app lifecycle.");
      }

      await this.#initPromise;

      return;
    }

    this.#initCallback = particlesInit;
    this.#initPromise = (async () => {
      if (particlesInit) {
        await particlesInit(engine);
      }

      await engine.init();

      this.#initialized = true;
    })().catch((error: unknown) => {
      this.#initPromise = undefined;
      this.#initCallback = undefined;
      this.#initialized = false;

      throw error;
    });

    await this.#initPromise;
  }

  public async waitForInitialization(): Promise<void> {
    await (this.#initPromise ?? Promise.resolve());
  }
}
