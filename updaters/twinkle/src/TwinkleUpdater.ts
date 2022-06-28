import type {
    IParticleColorStyle,
    IParticleUpdater,
    IParticlesOptions,
    Particle,
    ParticlesOptions,
    RecursivePartial,
} from "tsparticles-engine";
import { getRangeValue, getStyleFromHsl, rangeColorToHsl } from "tsparticles-engine";
import type { ITwinkle } from "./Options/Interfaces/ITwinkle";
import { Twinkle } from "./Options/Classes/Twinkle";

type TwinkeParticle = Particle & {
    options: TwinkleParticlesOptions;
};

type ITwinkleParticlesOptions = IParticlesOptions & {
    twinkle?: ITwinkle;
};

type TwinkleParticlesOptions = ParticlesOptions & {
    twinkle?: Twinkle;
};

export class TwinkleUpdater implements IParticleUpdater {
    getColorStyles(
        particle: Particle,
        context: CanvasRenderingContext2D,
        radius: number,
        opacity: number
    ): IParticleColorStyle {
        const pOptions = particle.options,
            twinkleOptions = pOptions.twinkle as Twinkle;

        if (!twinkleOptions) {
            return {};
        }

        const twinkle = twinkleOptions.particles,
            twinkling = twinkle.enable && Math.random() < twinkle.frequency,
            zIndexOptions = particle.options.zIndex,
            zOpacityFactor = (1 - particle.zIndexFactor) ** zIndexOptions.opacityRate,
            twinklingOpacity = twinkling ? getRangeValue(twinkle.opacity) * zOpacityFactor : opacity,
            twinkleRgb = rangeColorToHsl(twinkle.color),
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

    isEnabled(particle: TwinkeParticle): boolean {
        const pOptions = particle.options,
            twinkleOptions = pOptions.twinkle as Twinkle;

        if (!twinkleOptions) {
            return false;
        }

        return twinkleOptions.particles.enable;
    }

    update(): void {
        // do nothing
    }

    loadOptions(
        options: TwinkleParticlesOptions,
        ...sources: (RecursivePartial<ITwinkleParticlesOptions> | undefined)[]
    ): void {
        for (const source of sources) {
            if (!source?.twinkle) {
                continue;
            }

            if (!options.twinkle) {
                options.twinkle = new Twinkle();
            }

            options.twinkle.load(source.twinkle);
        }
    }
}
