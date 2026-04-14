import { Injectable } from "@angular/core";
import { Engine, tsParticles } from "@tsparticles/engine";

export type ParticlesPluginRegistrar = (engine: Engine) => Promise<void> | void;

let initialized = false;
let initPromise: Promise<void> | undefined;
let initCallback: ParticlesPluginRegistrar | undefined;

@Injectable({
  providedIn: "root",
})
export class NgParticlesService {
  public get loaded(): boolean {
    return initialized;
  }

  public assertInitialized(): void {
    if (!initialized) {
      throw new Error("NgParticlesService.init(...) must be called once before rendering ngx-particles components.");
    }
  }

  public async init(particlesInit?: ParticlesPluginRegistrar): Promise<void> {
    if (initialized) {
      return;
    }

    if (initPromise) {
      if (initCallback !== particlesInit) {
        throw new Error("NgParticlesService init callback must be stable across the app lifecycle.");
      }

      await initPromise;

      return;
    }

    initCallback = particlesInit;
    initPromise = (async () => {
      if (particlesInit) {
        await particlesInit(tsParticles);
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

  public async waitForInitialization(): Promise<void> {
    await (initPromise ?? Promise.resolve());
  }
}
