import type { IDomCanvasManager } from "./IDomCanvasManager.js";

/**
 * No-op implementation of IDomCanvasManager for headless/non-DOM scenarios.
 * Used when no DOM canvas manager factory is provided.
 */
export class NoOpDomCanvasManager implements IDomCanvasManager {
  get domElement(): HTMLCanvasElement | undefined {
    return undefined;
  }

  destroy(): void {
    // no-op
  }

  init(): void {
    // no-op
  }

  initBackground(): void {
    // no-op
  }

  loadCanvasElement(): void {
    // no-op
  }

  setPointerEvents(): void {
    // no-op
  }

  stop(): void {
    // no-op
  }
}
