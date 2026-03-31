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
  originPoint,
} from "@tsparticles/engine";

const minTrailLength = 3,
  trailLengthOffset = 1,
  minWidth = -1,
  firstIndex = 0,
  defaultLength = 10,
  loopTrailLengthOffset = 2,
  loopTrailLengthMinIndex = 0;

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
  private readonly _container;

  constructor(container: Container) {
    this._container = container;
  }

  drawAfter(data: IShapeDrawData<TrailParticle>): void {
    const { context, drawPosition, drawRadius, drawScale, particle, transformData } = data,
      container = this._container,
      diameter = drawRadius * double,
      pxRatio = container.retina.pixelRatio,
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

    const pathLengthFloor = Math.floor(pathLength);

    if (trail.length > pathLengthFloor) {
      trail.splice(firstIndex, trail.length - pathLengthFloor);
    }

    const trailLength = Math.min(trail.length, pathLength),
      canvasSize = {
        width: container.canvas.size.width * drawScale + diameter,
        height: container.canvas.size.height * drawScale + diameter,
      };

    context.save();

    context.lineCap = "butt";
    context.lineJoin = "round";

    for (let i = trailLength - loopTrailLengthOffset; i > loopTrailLengthMinIndex; i--) {
      const previousStep = trail[i + trailLengthOffset],
        step = trail[i],
        nextStep = trail[i - trailLengthOffset];

      if (!previousStep || !step || !nextStep) {
        continue;
      }

      const previousPosition = previousStep.position,
        position = step.position,
        nextPosition = nextStep.position,
        stepTransformData = particle.trailTransform ? (step.transformData ?? defaultTransform) : defaultTransform,
        { distance: previousDistance } = getDistances(previousPosition, position),
        { distance: nextDistance } = getDistances(position, nextPosition);

      if (previousDistance > pathLength * double || nextDistance > pathLength * double) {
        continue;
      }

      if (
        Math.abs(previousPosition.x - position.x) > canvasSize.width * half ||
        Math.abs(previousPosition.y - position.y) > canvasSize.height * half ||
        Math.abs(position.x - nextPosition.x) > canvasSize.width * half ||
        Math.abs(position.y - nextPosition.y) > canvasSize.height * half
      ) {
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

      const startX = (previousPosition.x + position.x) * half - position.x,
        startY = (previousPosition.y + position.y) * half - position.y,
        endX = (position.x + nextPosition.x) * half - position.x,
        endY = (position.y + nextPosition.y) * half - position.y;

      context.beginPath();
      context.moveTo(startX, startY);
      context.quadraticCurveTo(originPoint.x, originPoint.y, endX, endY);

      const width = Math.max((i / trailLength) * diameter, pxRatio, (particle.trailMinWidth ?? minWidth) * drawScale),
        oldAlpha = context.globalAlpha;

      context.globalAlpha = particle.trailFade ? i / trailLength : defaultAlpha;

      context.lineWidth = particle.trailMaxWidth ? Math.min(width, particle.trailMaxWidth * drawScale) : width;
      context.strokeStyle = step.color;
      context.stroke();

      context.globalAlpha = oldAlpha;
    }

    context.restore();
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
