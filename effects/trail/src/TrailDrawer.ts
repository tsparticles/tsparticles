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
 * Checks whether the particle (or its trail) is still inside the canvas for the given out-of-bounds direction. Returns undefined when the direction is not handled.
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
  readonly #container: Container;

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
      trail = particle.trail,
      trailTransform = particle.trailTransform;

    if (!trail || !particle.trailLength) {
      return;
    }

    const currentPos = drawPosition,
      pathLength = particle.trailLength * drawScale + drawRadius;

    trail.push({
      break: particle.justWarped,
      color: context.fillStyle,
      position: {
        x: currentPos.x,
        y: currentPos.y,
      },
      transformData,
    });

    const pathLengthFloor = Math.floor(pathLength);

    if (trail.length > pathLengthFloor) {
      trail.splice(firstIndex, trail.length - pathLengthFloor);
    }

    // The splice keeps the history within the configured path length.
    const trailLength = trail.length;

    if (trailLength < minTrailLength) {
      // The step is stored before drawing begins so the trail history can grow.
      return;
    }

    context.save();

    context.lineCap = "butt";
    context.lineJoin = "round";

    if (!trailTransform) {
      context.setTransform(defaultTransform.a, defaultTransform.b, defaultTransform.c, defaultTransform.d, 0, 0);
    }

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

      if (particle.trailMaxWidth === 0) {
        // Canvas ignores a zero lineWidth and would otherwise reuse the previous width.
        continue;
      }

      if (trailTransform) {
        context.setTransform(
          stepTransformData.a,
          stepTransformData.b,
          stepTransformData.c,
          stepTransformData.d,
          position.x,
          position.y,
        );
      }

      const startX = (previousPosition.x + position.x) * half - (trailTransform ? position.x : 0),
        startY = (previousPosition.y + position.y) * half - (trailTransform ? position.y : 0),
        endX = (position.x + nextPosition.x) * half - (trailTransform ? position.x : 0),
        endY = (position.y + nextPosition.y) * half - (trailTransform ? position.y : 0),
        controlX = trailTransform ? originPoint.x : position.x,
        controlY = trailTransform ? originPoint.y : position.y;

      context.beginPath();
      context.moveTo(startX, startY);
      context.quadraticCurveTo(controlX, controlY, endX, endY);

      const width = Math.max(
          (i / trailLength) * diameter,
          pxRatio,
          (particle.trailMinWidth ?? defaultWidth) * drawScale,
        ),
        oldAlpha = context.globalAlpha;

      context.globalAlpha = particle.trailFade ? i / trailLength : defaultAlpha;

      context.lineWidth =
        particle.trailMaxWidth !== undefined ? Math.min(width, particle.trailMaxWidth * drawScale) : width;
      context.strokeStyle = step.color;
      context.stroke();

      context.globalAlpha = oldAlpha;
    }

    context.restore();
  }

  /**
   * Checks whether the particle is inside the canvas bounds for its out mode.
   * @param data - The canvas bounds data.
   * @returns Whether the particle is inside the canvas.
   */
  isInsideCanvas(data: IParticleCanvasBoundsData<TrailParticle>): boolean {
    const { canvasSize, outMode, particle, radius } = data,
      position = particle.position,
      trail = particle.trail;

    let minX = position.x - radius,
      maxX = position.x + radius,
      minY = position.y - radius,
      maxY = position.y + radius;

    const useTrailBounds = outMode !== OutMode.bounce && outMode !== OutMode.split;

    if (trail && useTrailBounds) {
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
   * Releases particle-specific trail history when the particle is removed
   * @param particle - The particle to process
   */
  particleDestroy(particle: TrailParticle): void {
    delete particle.trail;
    delete particle.trailFade;
    delete particle.trailLength;
    delete particle.trailMaxWidth;
    delete particle.trailMinWidth;
    delete particle.trailTransform;
  }

  /**
   * Initializes trail-related particle properties
   * @param container - The container to handle
   * @param particle - The particle to process
   */
  particleInit(container: Container, particle: TrailParticle): void {
    particle.trail = [];

    const { effectData } = particle;

    particle.trailFade = effectData?.fade ?? true;
    particle.trailLength =
      getRangeValue(effectData?.length ?? defaultLength, container.engine.getRandomFn()) * container.retina.pixelRatio;
    particle.trailMaxWidth =
      effectData?.maxWidth !== undefined
        ? getRangeValue(effectData.maxWidth, container.engine.getRandomFn()) * container.retina.pixelRatio
        : undefined;
    particle.trailMinWidth =
      effectData?.minWidth !== undefined
        ? getRangeValue(effectData.minWidth, container.engine.getRandomFn()) * container.retina.pixelRatio
        : undefined;
    particle.trailTransform = effectData?.transform ?? false;
  }
}
