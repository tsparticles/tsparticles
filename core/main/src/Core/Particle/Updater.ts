import type { Container } from "../Container";
import type { Particle } from "../Particle";
import { Plugins } from "../../Utils";
import type { IDelta } from "../Interfaces/IDelta";
import type { IParticleUpdater } from "../Interfaces/IParticleUpdater";

/**
 * Particle updater, it manages movement
 * @category Core
 */
export class Updater {
    private readonly updaters: IParticleUpdater[];

    constructor(private readonly container: Container, private readonly particle: Particle) {
        this.updaters = Plugins.getUpdaters(container).map((t) => t(particle));
    }

    public update(delta: IDelta): void {
        for (const updater of this.updaters) {
            updater.update(delta);
        }
    }
}
