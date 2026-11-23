import { type ICoordinates, doublePI, getStyleFromOklch, half, quarter } from "@tsparticles/engine";
import type { LightContainer, LightParticle } from "./Types.js";

const gradientPos = {
    max: 1,
    min: 0,
  },
  halfPI = Math.PI * half,
  quarterPI = Math.PI * quarter,
  arcStart = 0;

/** Light mode identifier */
export const lightMode = "light";

/**
 * Draw the light area around the mouse
 * @param container - The container to handle
 * @param context - The rendering context
 * @param mousePos - The mouse position
 */
export function drawLight(
  container: LightContainer,
  context: OffscreenCanvasRenderingContext2D,
  mousePos: ICoordinates,
): void {
  const lightOptions = container.actualOptions.interactivity?.modes.light?.area;

  if (!lightOptions) {
    return;
  }

  context.beginPath();
  context.arc(mousePos.x, mousePos.y, lightOptions.radius, arcStart, doublePI);

  const gradientAmbientLight = context.createRadialGradient(
      mousePos.x,
      mousePos.y,
      arcStart,
      mousePos.x,
      mousePos.y,
      lightOptions.radius,
    ),
    gradientOklch = container.canvas.mouseLight;

  if (!gradientOklch?.start || !gradientOklch.stop) {
    return;
  }

  gradientAmbientLight.addColorStop(
    gradientPos.min,
    getStyleFromOklch(
      gradientOklch.start,
      container.hdr,
      undefined,
      container.peakNits,
      container.hdrMode,
      container.outputColorSpace,
    ),
  );
  gradientAmbientLight.addColorStop(
    gradientPos.max,
    getStyleFromOklch(
      gradientOklch.stop,
      container.hdr,
      undefined,
      container.peakNits,
      container.hdrMode,
      container.outputColorSpace,
    ),
  );

  context.fillStyle = gradientAmbientLight;
  context.fill();
}

/**
 * Draw the shadow of a particle in light mode
 * @param container - The container to handle
 * @param context - The rendering context
 * @param particle - The particle to process
 * @param mousePos - The mouse position
 */
export function drawParticleShadow(
  container: LightContainer,
  context: OffscreenCanvasRenderingContext2D,
  particle: LightParticle,
  mousePos: ICoordinates,
): void {
  const pos = particle.getPosition(),
    shadowOptions = container.actualOptions.interactivity?.modes.light?.shadow;

  if (!shadowOptions) {
    return;
  }

  const shadowOklch = particle.lightShadow;

  if (!shadowOklch) {
    return;
  }

  const radius = particle.getRadius(),
    sides = particle.sides,
    full = doublePI / sides,
    angle = -particle.getAngle() + quarterPI,
    factor = 1, // Math.sqrt(2)
    dots: ICoordinates[] = [];

  for (let i = 0; i < sides; i++) {
    dots.push({
      x: pos.x + radius * Math.sin(angle + full * i) * factor,
      y: pos.y + radius * Math.cos(angle + full * i) * factor,
    });
  }

  const points = [],
    shadowLength = shadowOptions.length;

  for (const dot of dots) {
    const dotAngle = Math.atan2(mousePos.y - dot.y, mousePos.x - dot.x),
      end: ICoordinates = {
        x: dot.x + shadowLength * Math.sin(-dotAngle - halfPI),
        y: dot.y + shadowLength * Math.cos(-dotAngle - halfPI),
      };

    points.push({
      end: end,
      start: dot,
    });
  }

  const shadowColor = getStyleFromOklch(
      shadowOklch,
      container.hdr,
      undefined,
      container.peakNits,
      container.hdrMode,
      container.outputColorSpace,
    ),
    lastOffset = 1,
    firstPos = 0,
    last = points.length - lastOffset;

  for (let i = last, n = 0; i >= firstPos; n = i--) {
    context.beginPath();

    const iPoint = points[i],
      nPoint = points[n];

    if (!iPoint || !nPoint) {
      continue;
    }

    context.moveTo(iPoint.start.x, iPoint.start.y);

    context.lineTo(nPoint.start.x, nPoint.start.y);
    context.lineTo(nPoint.end.x, nPoint.end.y);
    context.lineTo(iPoint.end.x, iPoint.end.y);

    context.fillStyle = shadowColor;

    context.fill();
  }
}
