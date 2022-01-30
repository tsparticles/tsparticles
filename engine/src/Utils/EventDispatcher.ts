import type { CustomEventArgs, CustomEventListener } from "../Types";

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

    removeAllEventListeners(type?: string): void {
        if (!type) {
            this.#listeners = new Map<string, CustomEventListener[]>();
        } else {
            this.#listeners.delete(type);
        }
    }

    dispatchEvent(type: string, args: CustomEventArgs): void {
        this.#listeners.get(type)?.forEach((handler) => handler(args));
    }

    hasEventListener(type: string): boolean {
        return !!this.#listeners.get(type);
    }
}
