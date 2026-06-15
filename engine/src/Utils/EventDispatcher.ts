import { deleteCount, minIndex } from "../Core/Utils/Constants.js";
import type { CustomEventArgs } from "../Types/CustomEventArgs.js";
import type { CustomEventListener } from "../Types/CustomEventListener.js";

/** Custom event dispatcher for managing event listeners */
export class EventDispatcher {
  #listeners: Map<string, CustomEventListener[]>;

  constructor() {
    this.#listeners = new Map<string, CustomEventListener[]>();
  }

  /**
   * Adds an event listener for the given type
   * @param type - The type
   * @param listener - The listener
   */
  addEventListener(type: string, listener: CustomEventListener): void {
    this.removeEventListener(type, listener);

    let arr = this.#listeners.get(type);

    if (!arr) {
      arr = [];

      this.#listeners.set(type, arr);
    }

    arr.push(listener);
  }

  /**
   * Dispatches an event to all registered listeners
   * @param type - The type
   * @param args - The arguments
   */
  dispatchEvent(type: string, args?: CustomEventArgs): void {
    const listeners = this.#listeners.get(type);

    listeners?.forEach(handler => {
      handler(args);
    });
  }

  /**
   * Checks if any listeners are registered for the given type
   * @param type - The type
   * @returns true if there are any listeners registered for the given type, false otherwise
   */
  hasEventListener(type: string): boolean {
    return !!this.#listeners.get(type);
  }

  /**
   * Removes all event listeners, optionally filtered by type
   * @param type - The type
   */
  removeAllEventListeners(type?: string): void {
    if (!type) {
      this.#listeners = new Map<string, CustomEventListener[]>();
    } else {
      this.#listeners.delete(type);
    }
  }

  /**
   * Removes a specific event listener
   * @param type - The type
   * @param listener - The listener
   */
  removeEventListener(type: string, listener: CustomEventListener): void {
    const arr = this.#listeners.get(type);

    if (!arr) {
      return;
    }

    const length = arr.length,
      idx = arr.indexOf(listener);

    if (idx < minIndex) {
      return;
    }

    if (length === deleteCount) {
      this.#listeners.delete(type);
    } else {
      arr.splice(idx, deleteCount);
    }
  }
}
