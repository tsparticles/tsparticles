import type { CustomEventArgs } from "../Types/CustomEventArgs";
import type { CustomEventListener } from "../Types/CustomEventListener";

export class EventDispatcher {
    private _listeners: Map<string, CustomEventListener[]>;

    constructor() {
        this._listeners = new Map<string, CustomEventListener[]>();
    }

    addEventListener(type: string, listener: CustomEventListener): void {
        this.removeEventListener(type, listener);

        if (!this._listeners.get(type)) {
            this._listeners.set(type, []);
        }

        this._listeners.get(type)?.push(listener);
    }

    dispatchEvent(type: string, args: CustomEventArgs): void {
        this._listeners.get(type)?.forEach((handler) => handler(args));
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
            idx = arr.indexOf(listener);

        if (idx < 0) {
            return;
        }

        if (length === 1) {
            this._listeners.delete(type);
        } else {
            arr.splice(idx, 1);
        }
    }
}
