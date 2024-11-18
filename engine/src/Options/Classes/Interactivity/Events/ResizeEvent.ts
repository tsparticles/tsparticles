import type { IOptionLoader } from "../../../Interfaces/IOptionLoader.js";
import type { IResizeEvent } from "../../../Interfaces/Interactivity/Events/IResizeEvent.js";
import type { RecursivePartial } from "../../../../Types/RecursivePartial.js";
import { isNull } from "../../../../Utils/TypeUtils.js";

export class ResizeEvent implements IResizeEvent, IOptionLoader<IResizeEvent> {
    delay;
    enable;

    constructor() {
        this.delay = 0.5;
        this.enable = true;
    }

    load(data?: RecursivePartial<IResizeEvent>): void {
        if (isNull(data)) {
            return;
        }

        if (data.delay !== undefined) {
            this.delay = data.delay;
        }

        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
    }
}
