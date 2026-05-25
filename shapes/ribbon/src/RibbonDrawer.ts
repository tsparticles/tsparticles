import { type Container, type IShapeDrawData, type IShapeDrawer, getRangeValue } from "@tsparticles/engine";
import { createRibbonState, drawRibbon, setRibbonBounds, updateRibbon } from "./Utils.js";
import type { RibbonParticle } from "./RibbonParticle.js";

const defaultSides = 12,
  defaultRibbonCount = 30,
  minRibbonCount = 4,
  sidesMultiplier = 2;

interface ParticleContainerRef {
  _container?: {
    canvas?: {
      size?: {
        height?: number;
        width?: number;
      };
    };
  };
}

/**
 *
 * @param particle
 * @param width
 * @param height
 */
function prepareRibbonParticle(particle: RibbonParticle, width: number, height: number): void {
  setRibbonBounds(particle, width, height);

  if (!particle.ribbonPoints?.length) {
    createRibbonState(particle);
  }
}

/**
 *
 * @param particle
 * @returns particle container canvas bounds if available
 */
function getParticleBounds(particle: RibbonParticle): { height: number; width: number } | undefined {
  const ref = particle as unknown as ParticleContainerRef,
    size = ref._container?.canvas?.size,
    width = size?.width,
    height = size?.height;

  if (width === undefined || height === undefined) {
    return undefined;
  }

  return { height, width };
}

/**
 *
 * @param particle
 * @returns the expected ribbon points count from shape data
 */
function getRibbonCount(particle: RibbonParticle): number {
  return Math.max(minRibbonCount, Math.round(getRangeValue(particle.shapeData?.count ?? defaultRibbonCount)));
}

/** Ribbon shape drawer plugin */
export class RibbonDrawer implements IShapeDrawer<RibbonParticle> {
  /**
   * Draws the ribbon shape
   * @param data
   */
  draw(data: IShapeDrawData<RibbonParticle>): void {
    const bounds = getParticleBounds(data.particle);

    if (bounds) {
      prepareRibbonParticle(data.particle, bounds.width, bounds.height);
    }

    if (data.particle.ribbonPoints && data.particle.ribbonPoints.length !== getRibbonCount(data.particle)) {
      createRibbonState(data.particle);
    }

    updateRibbon(data);
    drawRibbon(data);
  }

  /**
   * Gets the number of sides for this shape
   * @param particle
   */
  getSidesCount(particle: RibbonParticle): number {
    if (!particle.ribbonPoints?.length) {
      return defaultSides;
    }

    return Math.max(defaultSides, particle.ribbonPoints.length * sidesMultiplier);
  }

  /**
   * Resets ribbon state when particle respawns
   * @param particle
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
   * @param _container
   * @param container
   * @param particle
   */
  particleInit(container: Container, particle: RibbonParticle): void {
    prepareRibbonParticle(particle, container.canvas.size.width, container.canvas.size.height);
  }
}
