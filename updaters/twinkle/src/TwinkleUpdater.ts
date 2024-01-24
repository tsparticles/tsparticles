import {
    type IParticleColorStyle,
    type IParticleUpdater,
    type Particle,
    type RecursivePartial,
    getRandom,
    getRangeValue,
    getStyleFromHsl,
    rangeColorToHsl,
} from "@tsparticles/engine";
import type { ITwinkleParticlesOptions, TwinkeParticle, TwinkleParticlesOptions } from "./Types.js";
import { Twinkle } from "./Options/Classes/Twinkle.js";

export class TwinkleUpdater implements IParticleUpdater {
    getColorStyles(
        particle: Particle,
        context: CanvasRenderingContext2D,
        radius: number,
        opacity: number,
    ): IParticleColorStyle {
        const pOptions = particle.options,
            twinkleOptions = pOptions.twinkle as Twinkle;

        if (!twinkleOptions) {
            return {};
        }

        const twinkle = twinkleOptions.particles,
            twinkling = twinkle.enable && getRandom() < twinkle.frequency,
            zIndexOptions = particle.options.zIndex,
            zOffset = 1,
            zOpacityFactor = (zOffset - particle.zIndexFactor) ** zIndexOptions.opacityRate,
            twinklingOpacity = twinkling ? getRangeValue(twinkle.opacity) * zOpacityFactor : opacity,
            twinkleRgb = rangeColorToHsl(twinkle.color),
            twinkleStyle = twinkleRgb ? getStyleFromHsl(twinkleRgb, twinklingOpacity) : undefined,
            res: IParticleColorStyle = {},
            needsTwinkle = twinkling && twinkleStyle;

        res.fill = needsTwinkle ? twinkleStyle : undefined;
        res.stroke = needsTwinkle ? twinkleStyle : undefined;

        return res;
    }

    async init(): Promise<void> {
        await Promise.resolve();
    }

    isEnabled(particle: TwinkeParticle): boolean {
        const pOptions = particle.options,
            twinkleOptions = pOptions.twinkle!;

        if (!twinkleOptions) {
            return false;
        }

        return twinkleOptions.particles.enable;
    }

    loadOptions(
        options: TwinkleParticlesOptions,
        ...sources: (RecursivePartial<ITwinkleParticlesOptions> | undefined)[]
    ): void {
        if (!options.twinkle) {
            options.twinkle = new Twinkle();
        }

        for (const source of sources) {
            options.twinkle.load(source?.twinkle);
        }
    }

    async update(): Promise<void> {
        await Promise.resolve();
    }
}
