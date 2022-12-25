import type { IOptionLoader, RecursivePartial } from "tsparticles-engine";
import type { ISoundsAudio } from "../Interfaces/ISoundsAudio";

export class SoundsAudio implements ISoundsAudio, IOptionLoader<ISoundsAudio> {
    loop: boolean;
    source: string;

    constructor() {
        this.loop = false;
        this.source = "";
    }

    load(data?: RecursivePartial<ISoundsAudio | string>): void {
        if (data === undefined) {
            return;
        }

        if (typeof data === "object") {
            if (data.loop !== undefined) {
                this.loop = data.loop;
            }

            if (data.source !== undefined) {
                this.source = data.source;
            }
        } else {
            this.source = data;
        }
    }
}
