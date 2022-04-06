import type { IParticleColorStyle, IParticleUpdater, Particle } from "tsparticles-engine";
import { colorToHsl, getRangeValue, getStyleFromHsl } from "tsparticles-engine";

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
