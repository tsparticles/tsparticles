import type { IDelta } from "./IDelta";
import type { IParticleColorStyle } from "./IParticleColorStyle";
import type { Particle } from "../Particle";

export interface IParticleUpdater {
    init(particle: Particle): void;

    isEnabled(particle: Particle): boolean;

    update(particle: Particle, delta: IDelta): void;

    beforeDraw?: (particle: Particle) => void;

    getColorStyles?: (
        particle: Particle,
        context: CanvasRenderingContext2D,
        radius: number,
        opacity: number
    ) => IParticleColorStyle;

    afterDraw?: (particle: Particle) => void;
}
