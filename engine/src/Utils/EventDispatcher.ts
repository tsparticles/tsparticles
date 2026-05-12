import { deleteCount, minIndex } from "../Core/Utils/Constants.js";
import type { CustomEventArgs } from "../Types/CustomEventArgs.js";
import type { CustomEventListener } from "../Types/CustomEventListener.js";

/** Custom event dispatcher for managing event listeners */
export class EventDispatcher {
  private _listeners: Map<string, CustomEventListener[]>;

  constructor() {
    this._listeners = new Map<string, CustomEventListener[]>();
  }

  /**
   * Adds an event listener for the given type
   * @param type
   * @param listener
   */
  addEventListener(type: string, listener: CustomEventListener): void {
    this.removeEventListener(type, listener);

    let arr = this._listeners.get(type);

    if (!arr) {
      arr = [];

      this._listeners.set(type, arr);
    }

    arr.push(listener);
  }

  /**
   * Dispatches an event to all registered listeners
   * @param type
   * @param args
   */
  dispatchEvent(type: string, args?: CustomEventArgs): void {
    const listeners = this._listeners.get(type);

    listeners?.forEach(handler => {
      handler(args);
    });
  }

  /**
   * Checks if any listeners are registered for the given type
   * @param type
   */
  hasEventListener(type: string): boolean {
    return !!this._listeners.get(type);
  }

  /**
   * Removes all event listeners, optionally filtered by type
   * @param type
   */
  removeAllEventListeners(type?: string): void {
    if (!type) {
      this._listeners = new Map<string, CustomEventListener[]>();
    } else {
      this._listeners.delete(type);
    }
  }

  /**
   * Removes a specific event listener
   * @param type
   * @param listener
   */
  removeEventListener(type: string, listener: CustomEventListener): void {
    const arr = this._listeners.get(type);

    if (!arr) {
      return;
    }

    const length = arr.length,
      idx = arr.indexOf(listener);

    if (idx < minIndex) {
      return;
    }

    if (length === deleteCount) {
      this._listeners.delete(type);
    } else {
      arr.splice(idx, deleteCount);
    }
  }
}
