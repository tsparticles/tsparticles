import {
  type Container,
  type ICoordinates,
  type IEffectDrawer,
  type IShapeDrawData,
  type IShapeValues,
  type Particle,
  type RangeValue,
  defaultAlpha,
  double,
  getDistances,
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
    const { context, drawPosition, drawRadius, drawScale, particle, transformData } = data,
      diameter = drawRadius * double,
      pxRatio = particle.container.retina.pixelRatio,
      trail = particle.trail;

    if (!trail || !particle.trailLength) {
      return;
    }

    const currentPos = drawPosition,
      pathLength = particle.trailLength * drawScale + drawRadius;

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
        width: particle.container.canvas.size.width * drawScale + diameter,
        height: particle.container.canvas.size.height * drawScale + diameter,
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
        stepTransformData = particle.trailTransform ? (step.transformData ?? defaultTransform) : defaultTransform,
        { distance, dx, dy } = getDistances(lastPos, position);

      // Skip segment if distance is too large (wrap or zoom change)
      if (distance > pathLength * double) {
        lastPos = position;

        continue;
      }

      context.setTransform(
        stepTransformData.a,
        stepTransformData.b,
        stepTransformData.c,
        stepTransformData.d,
        position.x,
        position.y,
      );

      context.beginPath();
      context.moveTo(dx, dy);

      const warp = {
        x: (lastPos.x + canvasSize.width) % canvasSize.width,
        y: (lastPos.y + canvasSize.height) % canvasSize.height,
      };

      if (Math.abs(dx) > canvasSize.width * half || Math.abs(dy) > canvasSize.height * half) {
        lastPos = position;

        continue;
      }

      context.lineTo(
        Math.abs(dx) > canvasSize.width * half ? warp.x : originPoint.x,
        Math.abs(dy) > canvasSize.height * half ? warp.y : originPoint.y,
      );

      const width = Math.max((i / trailLength) * diameter, pxRatio, (particle.trailMinWidth ?? minWidth) * drawScale),
        oldAlpha = context.globalAlpha;

      context.globalAlpha = particle.trailFade ? i / trailLength : defaultAlpha;

      context.lineWidth = particle.trailMaxWidth ? Math.min(width, particle.trailMaxWidth * drawScale) : width;
      context.strokeStyle = step.color;
      context.stroke();

      context.globalAlpha = oldAlpha;

      lastPos = position;
    }
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
