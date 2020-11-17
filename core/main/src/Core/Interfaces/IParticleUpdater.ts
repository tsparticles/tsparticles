import type { IDelta } from "./IDelta";

export interface IParticleUpdater {
    isEnabled(): boolean;

    update(delta: IDelta): void;
}
