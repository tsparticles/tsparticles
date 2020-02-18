"use strict";

import { IMouseData } from "./IMouseData";

export interface IContainerInteractivity {
    el?: HTMLElement | Window | Node | null;
    status?: string;
    mouse: IMouseData;
}
