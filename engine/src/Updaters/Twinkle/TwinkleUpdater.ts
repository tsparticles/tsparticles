import { colorToHsl, getStyleFromHsl } from "../../Utils/ColorUtils";
import type { IParticleColorStyle } from "../../Core/Interfaces/IParticleColorStyle";
import type { IParticleUpdater } from "../../Core/Interfaces/IParticleUpdater";
import type { Particle } from "../../Core/Particle";
import { getRangeValue } from "../../Utils/NumberUtils";

export class TwinkleUpdater implements IParticleUpdater {
    getColorStyles(
        particle: Particle,
        context: CanvasRenderingContext2D,
        radius: number,
        opacity: number
    ): IParticleColorStyle {
        const pOptions = particle.options,
            twinkle = pOptions.twinkle.particles,
            twinkling = twinkle.enable && Math.random() < twinkle.frequency,
            zIndexOptions = particle.options.zIndex,
            zOpacityFactor = (1 - particle.zIndexFactor) ** zIndexOptions.opacityRate,
            twinklingOpacity = twinkling ? getRangeValue(twinkle.opacity) * zOpacityFactor : opacity,
            twinkleRgb = colorToHsl(twinkle.color),
            twinkleStyle = twinkleRgb ? getStyleFromHsl(twinkleRgb, twinklingOpacity) : undefined,
            res: IParticleColorStyle = {},
            needsTwinkle = twinkling && twinkleStyle;

        res.fill = needsTwinkle ? twinkleStyle : undefined;
        res.stroke = needsTwinkle ? twinkleStyle : undefined;

        return res;
    }

    init(): void {
        // do nothing
    }

    isEnabled(particle: Particle): boolean {
        return particle.options.twinkle.particles.enable;
    }

    update(): void {
        // do nothing
    }
}
