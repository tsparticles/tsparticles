import {
  CachePolicy,
  type Container,
  EffectLayer,
  type ICoordinates,
  type IEffectDrawer,
  type IShapeDrawData,
  type IShapeValues,
  type ITextureMetadata,
  type Particle,
  type RangeValue,
  defaultAlpha,
  double,
  getRangeValue,
  half,
  none,
  originPoint,
} from "@tsparticles/engine";

const minTrailLength = 2,
  trailLengthOffset = 1,
  minWidth = -1,
  defaultLength = 10;

interface TrailStep {
  color: string | CanvasGradient | CanvasPattern;
  position: ICoordinates;
  transformData?: {
    a: number;
    b: number;
    c: number;
    d: number;
  };
}

type TrailParticle = Particle & {
  trail?: TrailStep[];
  trailFade?: boolean;
  trailLength?: number;
  trailMaxWidth?: number;
  trailMinWidth?: number;
  trailTransform?: boolean;
};

interface ITrailData extends IShapeValues {
  fade: boolean;
  length: RangeValue;
  maxWidth: RangeValue;
  minWidth: RangeValue;
  transform: boolean;
}

const defaultTransform = {
  a: 1,
  b: 0,
  c: 0,
  d: 1,
};

export class TrailDrawer implements IEffectDrawer<TrailParticle> {
  drawAfter(data: IShapeDrawData<TrailParticle>): void {
    const { context, radius, particle, transformData } = data,
      diameter = radius * double,
      pxRatio = particle.container.retina.pixelRatio,
      currentPos = particle.getPosition(),
      trail = particle.trail;

    if (!trail || !particle.trailLength) {
      return;
    }

    const pathLength = particle.trailLength + radius;

    trail.push({
      color: context.fillStyle || context.strokeStyle,
      position: {
        x: currentPos.x,
        y: currentPos.y,
      },
      transformData,
    });

    if (trail.length < minTrailLength) {
      return;
    }

    while (trail.length > pathLength) {
      trail.shift();
    }

    const trailLength = Math.min(trail.length, pathLength),
      canvasSize = {
        width: particle.container.canvas.size.width + diameter,
        height: particle.container.canvas.size.height + diameter,
      },
      trailPos = trail[trailLength - trailLengthOffset];

    if (!trailPos) {
      return;
    }

    let lastPos = trailPos.position;

    for (let i = trailLength; i > none; i--) {
      const step = trail[i - trailLengthOffset];

      if (!step) {
        continue;
      }

      const position = step.position,
        stepTransformData = particle.trailTransform ? (step.transformData ?? defaultTransform) : defaultTransform;

      context.setTransform(
        stepTransformData.a,
        stepTransformData.b,
        stepTransformData.c,
        stepTransformData.d,
        position.x,
        position.y,
      );

      context.beginPath();
      context.moveTo(lastPos.x - position.x, lastPos.y - position.y);

      const warp = {
        x: (lastPos.x + canvasSize.width) % canvasSize.width,
        y: (lastPos.y + canvasSize.height) % canvasSize.height,
      };

      if (
        Math.abs(lastPos.x - position.x) > canvasSize.width * half ||
        Math.abs(lastPos.y - position.y) > canvasSize.height * half
      ) {
        lastPos = position;

        continue;
      }

      context.lineTo(
        Math.abs(lastPos.x - position.x) > canvasSize.width * half ? warp.x : originPoint.x,
        Math.abs(lastPos.y - position.y) > canvasSize.height * half ? warp.y : originPoint.y,
      );

      const width = Math.max((i / trailLength) * diameter, pxRatio, particle.trailMinWidth ?? minWidth),
        oldAlpha = context.globalAlpha;

      context.globalAlpha = particle.trailFade ? i / trailLength : defaultAlpha;

      context.lineWidth = particle.trailMaxWidth ? Math.min(width, particle.trailMaxWidth) : width;
      context.strokeStyle = step.color;
      context.stroke();

      context.globalAlpha = oldAlpha;

      lastPos = position;
    }

    context.setTransform(
      transformData.a,
      transformData.b,
      transformData.c,
      transformData.d,
      currentPos.x,
      currentPos.y,
    );
  }

  getDescriptor(particle: TrailParticle): string {
    const { trailFade, trailLength, trailMaxWidth, trailMinWidth, trailTransform } = particle;

    return `trail:${trailFade ? "fade" : "nofade"}:${trailLength ?? "auto"}:${trailMinWidth ?? "auto"}:${
      trailMaxWidth ?? "auto"
    }:${trailTransform ? "transform" : "static"}`;
  }

  getMetadata(): ITextureMetadata {
    return {
      cachePolicy: CachePolicy.Dynamic,
      effectLayer: EffectLayer.External,
    };
  }

  particleInit(container: Container, particle: TrailParticle): void {
    particle.trail = [];

    const effectData = particle.effectData as ITrailData | undefined;

    particle.trailFade = effectData?.fade ?? true;
    particle.trailLength = getRangeValue(effectData?.length ?? defaultLength) * container.retina.pixelRatio;
    particle.trailMaxWidth = effectData?.maxWidth
      ? getRangeValue(effectData.maxWidth) * container.retina.pixelRatio
      : undefined;
    particle.trailMinWidth = effectData?.minWidth
      ? getRangeValue(effectData.minWidth) * container.retina.pixelRatio
      : undefined;
    particle.trailTransform = effectData?.transform ?? false;
  }
}
