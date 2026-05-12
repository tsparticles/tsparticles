import type { Container } from "../Container.js";
import type { PluginManager } from "../Utils/PluginManager.js";

/**
 * Minimal interface for the DOM canvas manager attached to a CanvasManager.
 * Defined here in Core so that CanvasManager can accept an injected implementation
 * without importing from the Dom layer, keeping the dependency direction correct:
 * Dom → Core, never Core → Dom.
 */
export interface IDomCanvasManager {
  /** Gets the DOM canvas element, if any. */
  readonly domElement: HTMLCanvasElement | undefined;

  /** Destroys the DOM canvas manager. */
  destroy(): void;

  /** Initializes the DOM canvas manager (MutationObserver setup). */
  init(): void;

  /** Initializes the canvas background style. */
  initBackground(): void;

  /** Loads a DOM canvas element. */
  loadCanvasElement(domElement: HTMLCanvasElement | undefined, generated: boolean): void;

  /** Sets the pointer-events CSS property. */
  setPointerEvents(type: string): void;

  /** Stops the DOM canvas manager (cleanup). */
  stop(): void;
}

/**
 * Factory function to create a DOM canvas manager instance.
 */
export type DomCanvasManagerFactory = (pluginManager: PluginManager, container: Container) => IDomCanvasManager;
