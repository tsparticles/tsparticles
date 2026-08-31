import {
  type Container,
  type IParticleCanvasBoundsData,
  type IShapeDrawData,
  type IShapeDrawer,
  OutMode,
  OutModeDirection,
  getRangeValue,
} from "@tsparticles/engine";
import { createRibbonState, drawRibbon, setRibbonBounds, updateRibbon } from "./Utils.js";
import type { RibbonParticle } from "./RibbonParticle.js";

const defaultSides = 12,
  defaultRibbonCount = 30,
  minRibbonCount = 4,
  sidesMultiplier = 2,
  minRadius = 0,
  insideMargin = 0;

/**
 *
 * @param particle - The particle to process
 * @param width - The width
 * @param height - The height
 */
function prepareRibbonParticle(particle: RibbonParticle, width: number, height: number): void {
  setRibbonBounds(particle, width, height);

  if (!particle.ribbonPoints?.length) {
    createRibbonState(particle);
  }
}

/**
 *
 * @param particle - The particle to process
 * @returns the expected ribbon points count from shape data
 */
function getRibbonCount(particle: RibbonParticle): number {
  return Math.max(minRibbonCount, Math.round(getRangeValue(particle.shapeData?.count ?? defaultRibbonCount)));
}

/**
 *
 * @param data - The data to handle
 * @param minX - The minX
 * @param maxX - The maxX
 * @param minY - The minY
 * @param maxY - The maxY
 * @param margin - The margin
 * @returns true if the particle is inside the canvas, false otherwise
 */
function isInsideByDirection(
  data: IParticleCanvasBoundsData<RibbonParticle>,
  minX: number,
  maxX: number,
  minY: number,
  maxY: number,
  margin: number,
): boolean {
  const { canvasSize, direction } = data;

  if (direction === OutModeDirection.bottom) {
    return minY <= canvasSize.height + margin;
  }

  if (direction === OutModeDirection.left) {
    return maxX >= -margin;
  }

  if (direction === OutModeDirection.right) {
    return minX <= canvasSize.width + margin;
  }

  if (direction === OutModeDirection.top) {
    return maxY >= -margin;
  }

  return maxX >= -margin && maxY >= -margin && minX <= canvasSize.width + margin && minY <= canvasSize.height + margin;
}

/** Ribbon shape drawer plugin */
export class RibbonDrawer implements IShapeDrawer<RibbonParticle> {
  readonly #container: Container;

  constructor(container: Container) {
    this.#container = container;
  }

  /**
   * Draws the ribbon shape
   * @param data - The data to handle
   */
  draw(data: IShapeDrawData<RibbonParticle>): void {
    const bounds = this.#container.canvas.size;

    prepareRibbonParticle(data.particle, bounds.width, bounds.height);

    if (data.particle.ribbonPoints && data.particle.ribbonPoints.length !== getRibbonCount(data.particle)) {
      createRibbonState(data.particle);
    }

    updateRibbon(data);
    drawRibbon(data, this.#container.hdr, this.#container.peakNits, this.#container.hdrMode);
  }

  /**
   * Gets the number of sides for this shape
   * @param particle - The particle to process
   * @returns the sides count
   */
  getSidesCount(particle: RibbonParticle): number {
    const pointsLen = particle.ribbonPoints?.length;

    if (!pointsLen) {
      return defaultSides;
    }

    return Math.max(defaultSides, pointsLen * sidesMultiplier);
  }

  isInsideCanvas(data: IParticleCanvasBoundsData<RibbonParticle>): boolean {
    const { outMode, particle, radius } = data,
      points = particle.ribbonPoints,
      offsets = particle.ribbonOffsets,
      position = particle.position,
      strictBounds = outMode === OutMode.destroy || outMode === OutMode.out,
      scaledOffsetLen = (offsets?.length ?? minRadius) * radius,
      headRadius = Math.max(radius, scaledOffsetLen);

    if (!strictBounds) {
      return isInsideByDirection(
        data,
        position.x - headRadius,
        position.x + headRadius,
        position.y - headRadius,
        position.y + headRadius,
        insideMargin,
      );
    }

    if (!points?.length || !offsets) {
      return isInsideByDirection(
        data,
        position.x - headRadius,
        position.x + headRadius,
        position.y - headRadius,
        position.y + headRadius,
        insideMargin,
      );
    }

    let minX = Number.POSITIVE_INFINITY,
      maxX = Number.NEGATIVE_INFINITY,
      minY = Number.POSITIVE_INFINITY,
      maxY = Number.NEGATIVE_INFINITY;

    for (const point of points) {
      const baseX = point.position.x,
        baseY = point.position.y,
        sideX = baseX + offsets.x * radius,
        sideY = baseY + offsets.y * radius;

      minX = Math.min(minX, baseX, sideX);
      maxX = Math.max(maxX, baseX, sideX);
      minY = Math.min(minY, baseY, sideY);
      maxY = Math.max(maxY, baseY, sideY);
    }

    if (!Number.isFinite(minX) || !Number.isFinite(minY) || !Number.isFinite(maxX) || !Number.isFinite(maxY)) {
      return false;
    }

    const oscAmp =
        particle.ribbonOscillationSpeed && particle.ribbonOscillationDistance
          ? particle.ribbonOscillationDistance / particle.ribbonOscillationSpeed
          : minRadius,
      margin = Math.max(headRadius, particle.ribbonParticleDist ?? minRadius) + oscAmp;

    return isInsideByDirection(data, minX, maxX, minY, maxY, margin);
  }

  /**
   * Resets ribbon state when particle respawns
   * @param particle - The particle to process
   */
  loadShape(particle: RibbonParticle): void {
    if (!particle.shapeData) {
      return;
    }

    const count = getRibbonCount(particle);

    if (!particle.ribbonPoints?.length || particle.ribbonPoints.length !== count) {
      createRibbonState(particle);
    }
  }

  /**
   * Initializes ribbon-specific particle properties
   * @param container - The container to handle
   * @param particle - The particle to process
   */
  /**
   * Clears ribbon state when particle is destroyed, so it gets properly recreated when recycled from the pool.
   * Without this, a recycled particle would keep stale ribbonPoints[] positions (from when it was destroyed
   * far off-screen), causing isInsideCanvas to immediately flag it as outside again.
   * @param particle - The particle to process
   */
  particleDestroy(particle: RibbonParticle): void {
    delete particle.ribbonPoints;
    delete particle.ribbonHead;
    delete particle.ribbonPreviousHead;
    delete particle.ribbonPreviousPosition;
    delete particle.ribbonTime;
    delete particle.ribbonOffsets;
    delete particle.ribbonParticleDist;
    delete particle.ribbonMass;
    delete particle.ribbonDrag;
    delete particle.ribbonVelocityInherit;
    delete particle.ribbonOscillationSpeed;
    delete particle.ribbonOscillationDistance;
  }

  particleInit(container: Container, particle: RibbonParticle): void {
    prepareRibbonParticle(particle, container.canvas.size.width, container.canvas.size.height);
  }
}
