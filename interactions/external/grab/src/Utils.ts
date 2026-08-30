import type { GrabContainer, LinkParticle } from "./Types.js";
import { type HdrMode, type ICoordinates, type IRgb, getStyleFromRgb } from "@tsparticles/engine";
import { drawLine } from "@tsparticles/canvas-utils";

const defaultWidth = 0;

/**
 * Draws a grab line between two points using canvas API in the given context.
 * @param context - The canvas context to draw on.
 * @param width - The width of the line.
 * @param begin - The first position of the line.
 * @param end - The second position of the line.
 * @param colorLine - The color of the line.
 * @param opacity - The opacity of the line.
 * @param hdr - Whether the line should be drawn in HDR mode or not.
 * @param peakNits - The peak nits value
 * @param mode - The HDR mode
 */
export function drawGrabLine(
  context: OffscreenCanvasRenderingContext2D,
  width: number,
  begin: ICoordinates,
  end: ICoordinates,
  colorLine: IRgb,
  opacity: number,
  hdr = false,
  peakNits?: number,
  mode?: HdrMode,
): void {
  drawLine(context, begin, end);

  context.strokeStyle = getStyleFromRgb(colorLine, hdr, opacity, peakNits, mode);
  context.lineWidth = width;
  context.stroke();
}

/**
 * Draw the grab interaction
 * @param container - The container to handle
 * @param particle - The particle to process
 * @param lineColor - The lineColor
 * @param opacity - The opacity value
 * @param mousePos - The mouse position
 */
export function drawGrab(
  container: GrabContainer,
  particle: LinkParticle,
  lineColor: IRgb,
  opacity: number,
  mousePos: ICoordinates,
): void {
  container.canvas.render.draw(ctx => {
    const beginPos = particle.getPosition();

    drawGrabLine(
      ctx,
      particle.retina.linksWidth ?? defaultWidth,
      beginPos,
      mousePos,
      lineColor,
      opacity,
      container.hdr,
      container.peakNits,
      container.hdrMode,
    );
  });
}
