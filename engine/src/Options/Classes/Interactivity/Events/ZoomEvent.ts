import type { IOptionLoader } from "../../../Interfaces/IOptionLoader.js";
import type { IZoomEvent } from "../../../Interfaces/Interactivity/Events/IZoomEvent.js";
import type { RecursivePartial } from "../../../../export-types.js";

export class ZoomEvent implements IZoomEvent, IOptionLoader<IZoomEvent> {
    enable;
    max;
    min;
    sensitivity;

    constructor() {
        this.enable = false;
        this.max = 10;
        this.min = 1;
        this.sensitivity = 0.01;
    }

    load(data?: RecursivePartial<IZoomEvent>): void {
        if (!data) {
            return;
        }

        if (data.enable !== undefined) {
            this.enable = data.enable;
        }

        if (data.max !== undefined) {
            this.max = data.max;
        }

        if (data.min !== undefined) {
            this.min = data.min;
        }

        if (data.sensitivity !== undefined) {
            this.sensitivity = data.sensitivity;
        }
    }
}
