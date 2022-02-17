import type { IOptionLoader, IParticlesBounce } from "../../../Interfaces";
import { ParticlesBounceFactor } from "./ParticlesBounceFactor";
import type { RecursivePartial } from "../../../../Types";

export class ParticlesBounce implements IParticlesBounce, IOptionLoader<IParticlesBounce> {
    horizontal;
    vertical;

    constructor() {
        this.horizontal = new ParticlesBounceFactor();
        this.vertical = new ParticlesBounceFactor();
    }

    load(data?: RecursivePartial<IParticlesBounce>): void {
        if (!data) {
            return;
        }

        this.horizontal.load(data.horizontal);
        this.vertical.load(data.vertical);
    }
}
