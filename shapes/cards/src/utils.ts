import {
  type IRgb,
  double,
  doublePI,
  getStyleFromRgb,
  half,
  originPoint,
  safeDocument,
  triple,
} from "@tsparticles/engine";
import type { ICardData } from "./ICardData.js";
import { SuitType } from "./SuitType.js";
import { drawPath } from "@tsparticles/path-utils";
import { paths } from "./paths.js";

const cardWidthRatio = (double * double) / triple,
  cardHeightRatio = double,
  cornerRadiusRatio = 0.2,
  cornerFontRatio = 0.4,
  cornerSuitRatio = 0.3,
  centerSuitRatio = 0.7,
  cornerPaddingRatio = 0.2,
  // Adjusted for a tighter fit between suit and text
  textHorizontalOffsetRatio = 0.25,
  minRadius = 0,
  minAngle = 0,
  suitEdgeBufferFactor = 0.1,
  fixedCacheKey = 2,
  cardsCache = new Map<string, ImageBitmap | HTMLCanvasElement>(),
  redSuitColor: IRgb = { r: 215, g: 20, b: 20 },
  blackSuitColor: IRgb = { r: 18, g: 18, b: 18 };

/**
 * Draws a rounded card with suit and value side-by-side.
 * The suit is slightly offset from the edge to avoid touching the border.
 * @param ctx -
 * @param radius -
 * @param cardData -
 * @param hdr -
 * @param flipped -
 * @param canvasSettings -
 */
export function drawRoundedCard(
  ctx: CanvasRenderingContext2D,
  radius: number,
  cardData: ICardData,
  hdr: boolean,
  flipped: boolean,
  canvasSettings?: CanvasRenderingContext2DSettings,
): void {
  if (flipped) {
    drawRoundedCardBack(ctx, radius);
  } else {
    const cacheKey = getCacheKey(radius, hdr, cardData),
      cardWidth = radius * cardWidthRatio,
      cardHeight = radius * cardHeightRatio,
      halfWidth = cardWidth * half,
      halfHeight = cardHeight * half;

    let cachedData = cardsCache.get(cacheKey);

    if (!cachedData) {
      let cacheCanvas: HTMLCanvasElement | OffscreenCanvas,
        cacheCtx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D | null;

      if (typeof OffscreenCanvas === "undefined") {
        cacheCanvas = safeDocument().createElement("canvas");

        cacheCanvas.width = cardWidth;
        cacheCanvas.height = cardHeight;

        cacheCtx = cacheCanvas.getContext("2d", canvasSettings);
      } else {
        cacheCanvas = new OffscreenCanvas(cardWidth, cardHeight);
        cacheCtx = cacheCanvas.getContext("2d", canvasSettings);
      }

      if (cacheCtx) {
        cacheCtx.translate(halfWidth, halfHeight);

        drawRoundedCardFront(cacheCtx, radius, cardData, hdr);

        cachedData = cacheCanvas instanceof HTMLCanvasElement ? cacheCanvas : cacheCanvas.transferToImageBitmap();

        cardsCache.set(cacheKey, cachedData);
      }
    }

    if (cachedData) {
      ctx.drawImage(cachedData, -halfWidth, -halfHeight, cardWidth, cardHeight);
    } else {
      drawRoundedCardFront(ctx, radius, cardData, hdr);
    }
  }
}

/**
 * @param radius -
 * @param hdr -
 * @param cardData -
 * @returns -
 */
function getCacheKey(radius: number, hdr: boolean, cardData: ICardData): string {
  return `${radius.toFixed(fixedCacheKey)}-${hdr ? "hdr" : "sdr"}-${cardData.suit}-${cardData.value}`;
}

/**
 * @param ctx -
 * @param radius -
 */
function drawRoundedCardBack(ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D, radius: number): void {
  drawCardBody(ctx, radius);
}

/**
 * @param ctx -
 * @param radius -
 * @param cardData -
 * @param hdr -
 */
function drawRoundedCardFront(
  ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
  radius: number,
  cardData: ICardData,
  hdr: boolean,
): void {
  const { suit, value } = cardData,
    cardWidth = radius * cardWidthRatio,
    cardHeight = radius * cardHeightRatio,
    halfWidth = cardWidth * half,
    halfHeight = cardHeight * half,
    cornerPadding = radius * cornerPaddingRatio,
    cornerFontSize = radius * cornerFontRatio,
    cornerSuitSize = radius * cornerSuitRatio,
    centerSuitSize = radius * centerSuitRatio,
    // Horizontal gap between suit and value
    textOffset = radius * textHorizontalOffsetRatio,
    // Extra padding to keep the suit away from the card edge
    suitEdgeBuffer = radius * suitEdgeBufferFactor,
    isRed = suit === SuitType.hearts || suit === SuitType.diamonds,
    color = isRed ? getStyleFromRgb(redSuitColor, hdr) : getStyleFromRgb(blackSuitColor, hdr);

  ctx.save();

  // --- 1. Drawing Card Body ---
  drawCardBody(ctx, radius);

  ctx.fillStyle = getStyleFromRgb({ r: 255, g: 255, b: 255 }, hdr);
  ctx.fill();
  ctx.strokeStyle = getStyleFromRgb({ r: 0, g: 0, b: 0 }, hdr);
  ctx.stroke();

  // --- 2. Text and Suit Style Configuration ---
  ctx.fillStyle = color;
  ctx.font = `bold ${cornerFontSize.toString()}px Arial, serif`;
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";

  // Base coordinates for the corner content
  const topLeftX = -halfWidth + cornerPadding + suitEdgeBuffer;
  const topLeftY = -halfHeight + cornerPadding + cornerFontSize * half;

  // --- 3. Top Left Corner (Suit then Value) ---
  ctx.save();
  ctx.translate(topLeftX, topLeftY);
  ctx.beginPath();
  drawPath(ctx, cornerSuitSize, paths[suit]);
  ctx.fill();
  ctx.restore();

  // Value text drawn closer to the suit
  ctx.fillText(value, topLeftX + textOffset, topLeftY);

  // --- 4. Lower Right Corner (Suit then Value, Rotated) ---
  ctx.save();
  ctx.translate(halfWidth - cornerPadding - suitEdgeBuffer, halfHeight - cornerPadding - cornerFontSize * half);
  ctx.rotate(Math.PI);

  // Suit relative to rotation
  ctx.save();
  ctx.beginPath();
  drawPath(ctx, cornerSuitSize, paths[suit]);
  ctx.fill();
  ctx.restore();

  // Value text relative to rotation
  ctx.fillText(value, originPoint.x + textOffset, originPoint.y);
  ctx.restore();

  // --- 5. Central Suit ---
  ctx.save();
  ctx.beginPath();
  drawPath(ctx, centerSuitSize, paths[suit]);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.restore();

  // Final cleanup arc
  ctx.beginPath();
  ctx.arc(originPoint.x, originPoint.y, minRadius, minAngle, doublePI, false);
  ctx.closePath();

  ctx.restore();
}

/**
 * @param ctx -
 * @param radius -
 */
function drawCardBody(ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D, radius: number): void {
  const cardWidth = radius * cardWidthRatio,
    cardHeight = radius * cardHeightRatio,
    halfWidth = cardWidth * half,
    halfHeight = cardHeight * half,
    cornerRadius = radius * cornerRadiusRatio;

  ctx.beginPath();
  ctx.moveTo(-halfWidth + cornerRadius, -halfHeight);
  ctx.lineTo(halfWidth - cornerRadius, -halfHeight);
  ctx.quadraticCurveTo(halfWidth, -halfHeight, halfWidth, -halfHeight + cornerRadius);
  ctx.lineTo(halfWidth, halfHeight - cornerRadius);
  ctx.quadraticCurveTo(halfWidth, halfHeight, halfWidth - cornerRadius, halfHeight);
  ctx.lineTo(-halfWidth + cornerRadius, halfHeight);
  ctx.quadraticCurveTo(-halfWidth, halfHeight, -halfWidth, halfHeight - cornerRadius);
  ctx.lineTo(-halfWidth, -halfHeight + cornerRadius);
  ctx.quadraticCurveTo(-halfWidth, -halfHeight, -halfWidth + cornerRadius, -halfHeight);
  ctx.closePath();
}
