import type { CustomEventArgs } from "../Types/CustomEventArgs";
import type { CustomEventListener } from "../Types/CustomEventListener";

export class EventDispatcher {
    #listeners: Map<string, CustomEventListener[]>;

    constructor() {
        this.#listeners = new Map<string, CustomEventListener[]>();
    }

    addEventListener(type: string, listener: CustomEventListener): void {
        this.removeEventListener(type, listener);

        if (!this.#listeners.get(type)) {
            this.#listeners.set(type, []);
        }

        this.#listeners.get(type)?.push(listener);
    }

    dispatchEvent(type: string, args: CustomEventArgs): void {
        this.#listeners.get(type)?.forEach((handler) => handler(args));
    }

    hasEventListener(type: string): boolean {
        return !!this.#listeners.get(type);
    }

    removeAllEventListeners(type?: string): void {
        if (!type) {
            this.#listeners = new Map<string, CustomEventListener[]>();
        } else {
            this.#listeners.delete(type);
        }
    }

    removeEventListener(type: string, listener: CustomEventListener): void {
        const arr = this.#listeners.get(type);

        if (!arr) {
            return;
        }

        const length = arr.length,
            idx = arr.indexOf(listener);

        if (idx < 0) {
            return;
        }

        if (length === 1) {
            this.#listeners.delete(type);
        } else {
            arr.splice(idx, 1);
        }
    }
}
