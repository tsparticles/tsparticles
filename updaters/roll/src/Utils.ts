import { AlterType, type IDelta, getRandom, getRangeValue, halfRandom, rangeColorToHsl } from "@tsparticles/engine";
import { RollMode } from "./RollMode.js";
import type { RollParticle } from "./Types.js";

const double = 2,
    doublePI = Math.PI * double,
    maxAngle = 360;

/**
 *
 * @param particle -
 */
export function initParticle(particle: RollParticle): void {
    const rollOpt = particle.options.roll;

    if (!rollOpt?.enable) {
        particle.roll = {
            enable: false,
            horizontal: false,
            vertical: false,
            angle: 0,
            speed: 0,
        };

        return;
    }

    particle.roll = {
        enable: rollOpt.enable,
        horizontal: rollOpt.mode === RollMode.horizontal || rollOpt.mode === RollMode.both,
        vertical: rollOpt.mode === RollMode.vertical || rollOpt.mode === RollMode.both,
        angle: getRandom() * doublePI,
        speed: getRangeValue(rollOpt.speed) / maxAngle,
    };

    if (rollOpt.backColor) {
        particle.backColor = rangeColorToHsl(rollOpt.backColor);
    } else if (rollOpt.darken.enable && rollOpt.enlighten.enable) {
        const alterType = getRandom() >= halfRandom ? AlterType.darken : AlterType.enlighten;

        particle.roll.alter = {
            type: alterType,
            value: getRangeValue(alterType === AlterType.darken ? rollOpt.darken.value : rollOpt.enlighten.value),
        };
    } else if (rollOpt.darken.enable) {
        particle.roll.alter = {
            type: AlterType.darken,
            value: getRangeValue(rollOpt.darken.value),
        };
    } else if (rollOpt.enlighten.enable) {
        particle.roll.alter = {
            type: AlterType.enlighten,
            value: getRangeValue(rollOpt.enlighten.value),
        };
    }
}

/**
 * @param particle -
 * @param delta -
 */
export function updateRoll(particle: RollParticle, delta: IDelta): void {
    const roll = particle.options.roll,
        data = particle.roll;

    if (!data || !roll?.enable) {
        return;
    }

    const speed = data.speed * delta.factor,
        max = doublePI;

    data.angle += speed;

    if (data.angle > max) {
        data.angle -= max;
    }
}
