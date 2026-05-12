/**
 * Minimal interface for the event listeners manager attached to a Container.
 * Defined here in Core so that Container can accept an injected implementation
 * without importing from the Dom layer, keeping the dependency direction correct:
 * Dom → Core, never Core → Dom.
 */
export interface IEventListeners {
  /** Attaches all browser event listeners (resize, visibility, …). */
  addListeners(): void;
  /** Detaches all previously attached listeners. */
  removeListeners(): void;
}
