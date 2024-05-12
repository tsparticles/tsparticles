import type { CustomEventArgs } from "../Types/CustomEventArgs.js";
import type { CustomEventListener } from "../Types/CustomEventListener.js";

/**
 */
export class EventDispatcher {
    private _listeners: Map<string, CustomEventListener[]>;

    constructor() {
        this._listeners = new Map<string, CustomEventListener[]>();
    }

    addEventListener(type: string, listener: CustomEventListener): void {
        this.removeEventListener(type, listener);

        let arr = this._listeners.get(type);

        if (!arr) {
            arr = [];

            this._listeners.set(type, arr);
        }

        arr.push(listener);
    }

    dispatchEvent(type: string, args: CustomEventArgs): void {
        const listeners = this._listeners.get(type);

        listeners?.forEach(handler => handler(args));
    }

    hasEventListener(type: string): boolean {
        return !!this._listeners.get(type);
    }

    removeAllEventListeners(type?: string): void {
        if (!type) {
            this._listeners = new Map<string, CustomEventListener[]>();
        } else {
            this._listeners.delete(type);
        }
    }

    removeEventListener(type: string, listener: CustomEventListener): void {
        const arr = this._listeners.get(type);

        if (!arr) {
            return;
        }

        const length = arr.length,
            idx = arr.indexOf(listener),
            minIndex = 0;

        if (idx < minIndex) {
            return;
        }

        const deleteCount = 1;

        if (length === deleteCount) {
            this._listeners.delete(type);
        } else {
            arr.splice(idx, deleteCount);
        }
    }
}
