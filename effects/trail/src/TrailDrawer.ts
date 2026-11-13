import {
  type Container,
  type ICoordinates,
  type IEffectDrawer,
  type IParticleCanvasBoundsData,
  type IShapeDrawData,
  type IShapeValues,
  OutMode,
  OutModeDirection,
  type Particle,
  type RangeValue,
  defaultAlpha,
  defaultTransform,
  double,
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
  loopTrailLengthMinIndex = 0,
  defaultWidth = 0,
  minBound = 0;

/** Trail step data */
export interface TrailStep {
  break: boolean;
  color: string | CanvasGradient | CanvasPattern;
  position: ICoordinates;
  transformData?: {
    a: number;
    b: number;
    c: number;
    d: number;
  };
}

/**
 * Trail effect shape data
 */
export interface ITrailData extends IShapeValues {
  /** Whether the trail fades */
  fade?: boolean;
  /** Trail length */
  length?: RangeValue;
  /** Maximum trail width */
  maxWidth?: RangeValue;
  /** Minimum trail width */
  minWidth?: RangeValue;
  /** Whether to use transform data */
  transform?: boolean;
}

/**
 * Trail effect particle extension type
 */
export type TrailParticle = Particle & {
  /** Trail effect data */
  effectData?: ITrailData;
  /** Trail step history */
  trail?: TrailStep[];
  /** Whether the trail fades */
  trailFade?: boolean;
  /** Trail length */
  trailLength?: number;
  /** Maximum trail width */
  trailMaxWidth?: number;
  /** Minimum trail width */
  trailMinWidth?: number;
  /** Whether to apply transform data */
  trailTransform?: boolean;
};

/**
 *
 * @param data - The canvas bounds data.
 * @param isBounce - Whether the particle is bouncing or splitting.
 * @param bouncePosition - The particle position used for bounce checks.
 * @param minX - The leftmost trail bound.
 * @param maxX - The rightmost trail bound.
 * @param minY - The topmost trail bound.
 * @param maxY - The bottommost trail bound.
 */
function isInsideByDirection(
  data: IParticleCanvasBoundsData<TrailParticle>,
  isBounce: boolean,
  bouncePosition: ICoordinates,
  minX: number,
  maxX: number,
  minY: number,
  maxY: number,
): boolean | undefined {
  const { canvasSize, direction, radius } = data;

  switch (direction) {
    case OutModeDirection.bottom:
      return isBounce ? bouncePosition.y + radius < canvasSize.height : minY <= canvasSize.height;
    case OutModeDirection.left:
      return isBounce ? bouncePosition.x - radius > minBound : maxX >= minBound;
    case OutModeDirection.right:
      return isBounce ? bouncePosition.x + radius < canvasSize.width : minX <= canvasSize.width;
    case OutModeDirection.top:
      return isBounce ? bouncePosition.y - radius > minBound : maxY >= minBound;
    default:
      return undefined;
  }
}

/** Trail effect drawer plugin */
export class TrailDrawer implements IEffectDrawer<TrailParticle> {
  /** The particles container */
  readonly #container;

  /**
   * TrailDrawer constructor
   * @param container - The container to handle
   */
  constructor(container: Container) {
    this.#container = container;
  }

  /**
   * Draws the particle trail after particle rendering
   * @param data - The data to handle
   */
  drawAfter(data: IShapeDrawData<TrailParticle>): void {
    const { context, drawPosition, drawRadius, drawScale, particle, transformData } = data,
      container = this.#container,
      diameter = drawRadius * double,
      pxRatio = container.retina.pixelRatio,
      trail = particle.trail;

    if (!trail || !particle.trailLength) {
      return;
    }

    const currentPos = drawPosition,
      pathLength = particle.trailLength * drawScale + drawRadius;

    trail.push({
      break: particle.justWarped,
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

    const trailLength = Math.min(trail.length, pathLength);

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
        stepTransformData = particle.trailTransform ? (step.transformData ?? defaultTransform) : defaultTransform;

      if (step.break || previousStep.break || nextStep.break) {
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

  isInsideCanvas(data: IParticleCanvasBoundsData<TrailParticle>): boolean {
    const { canvasSize, outMode, particle, radius } = data,
      position = particle.position,
      trail = particle.trail;

    let minX = position.x - radius,
      maxX = position.x + radius,
      minY = position.y - radius,
      maxY = position.y + radius;

    const useTrailBounds = outMode !== OutMode.bounce && outMode !== OutMode.split;

    if (trail?.length && useTrailBounds) {
      const widthPadding = Math.max(
        radius,
        particle.trailMaxWidth ?? defaultWidth,
        particle.trailMinWidth ?? defaultWidth,
      );

      for (const step of trail) {
        minX = Math.min(minX, step.position.x - widthPadding);
        maxX = Math.max(maxX, step.position.x + widthPadding);
        minY = Math.min(minY, step.position.y - widthPadding);
        maxY = Math.max(maxY, step.position.y + widthPadding);
      }
    }

    const strictBounds = outMode === OutMode.destroy,
      isBounce = outMode === OutMode.bounce || outMode === OutMode.split,
      bouncePosition = isBounce ? particle.getPosition() : position,
      directionalResult = isInsideByDirection(data, isBounce, bouncePosition, minX, maxX, minY, maxY);

    if (directionalResult !== undefined) {
      return directionalResult;
    }

    if (!strictBounds) {
      return (
        bouncePosition.x + radius >= minBound &&
        bouncePosition.y + radius >= minBound &&
        bouncePosition.x - radius <= canvasSize.width &&
        bouncePosition.y - radius <= canvasSize.height
      );
    }

    return maxX >= minBound && maxY >= minBound && minX <= canvasSize.width && minY <= canvasSize.height;
  }

  /**
   * Initializes trail-related particle properties
   * @param container - The container to handle
   * @param particle - The particle to process
   */
  particleInit(container: Container, particle: TrailParticle): void {
    particle.trail = [];

    const effectData = particle.effectData;

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
