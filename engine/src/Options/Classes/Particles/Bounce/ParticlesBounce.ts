import type { IOptionLoader } from "../../../Interfaces/IOptionLoader.js";
import type { IParticlesBounce } from "../../../Interfaces/Particles/Bounce/IParticlesBounce.js";
import { ParticlesBounceFactor } from "./ParticlesBounceFactor.js";
import type { RecursivePartial } from "../../../../Types/RecursivePartial.js";

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
