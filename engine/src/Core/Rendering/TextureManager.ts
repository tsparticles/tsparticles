import { CachePolicy, EffectLayer, TextureColorMode } from "../../Enums/Texture/Enums.js";
import { CanvasPool } from "./CanvasPool.js";
import type { Container } from "../Container.js";
import type { IDelta } from "../Interfaces/IDelta.js";
import type { IEffectDrawer } from "../Interfaces/IEffectDrawer.js";
import type { IHsl } from "../Interfaces/Colors.js";
import type { IShapeDrawData } from "../Interfaces/IShapeDrawData.js";
import type { IShapeDrawer } from "../Interfaces/IShapeDrawer.js";
import type { ITextureMetadata } from "../Interfaces/ITextureMetadata.js";
import type { Particle } from "../Particle.js";
import { getStyleFromHsl } from "../../Utils/ColorUtils.js";
import { minStrokeWidth } from "../Utils/Constants.js";

const hueQuantization = 5,
  radiusQuantization = 0.5,
  maxCacheSize = 512,
  maskColor = "rgba(255,255,255,1)",
  one = 1,
  zero = 0,
  halfDivider = 2;

interface TextureKeyData {
  cachePolicy: CachePolicy;
  colorMode: TextureColorMode;
  descriptor: string;
  fillColor: IHsl | undefined;
  padding: number;
  particle: Particle;
  quantizedRadius: number;
  strokeColor: IHsl | undefined;
  tintMode?: string;
}

interface TextureCacheEntry {
  canvas: HTMLCanvasElement;
  lastAccess: number;
}

interface TextureColorStyles {
  fill?: string;
  stroke?: string;
}

/**
 * Centralized texture manager with quantized caching
 */
export class TextureManager {
  private readonly _cache = new Map<string, TextureCacheEntry>();
  private readonly _canvasPool = new CanvasPool();
  private readonly _textureRadiusMap = new WeakMap<HTMLCanvasElement, number>();

  constructor(private readonly _container: Container) {}

  clear(): void {
    for (const entry of this._cache.values()) {
      this._canvasPool.returnCanvas(entry.canvas);
      this._textureRadiusMap.delete(entry.canvas);
    }

    this._cache.clear();
    this._canvasPool.clear();
  }

  getEffectLayer(effectDrawer: IEffectDrawer | undefined, particle: Particle): EffectLayer {
    const metadata = this._getMetadata(effectDrawer, particle);

    return metadata?.effectLayer ?? EffectLayer.Internal;
  }

  getTexture(
    particle: Particle,
    delta: IDelta,
    shapeDrawer: IShapeDrawer | undefined,
    effectDrawer: IEffectDrawer | undefined,
    fillColor: IHsl | undefined,
    strokeColor: IHsl | undefined,
    colorStyles: TextureColorStyles,
    drawRadius: number,
  ): HTMLCanvasElement | undefined {
    if (!shapeDrawer) {
      return;
    }

    const shapeDescriptor = this._getDescriptor(shapeDrawer, particle, `shape:${particle.shape ?? "unknown"}`),
      effectLayer = this.getEffectLayer(effectDrawer, particle),
      effectDescriptor =
        effectLayer === EffectLayer.Internal && particle.effect
          ? this._getDescriptor(effectDrawer, particle, `effect:${particle.effect}`)
          : undefined,
      descriptor = effectDescriptor ? `${shapeDescriptor}|${effectDescriptor}` : shapeDescriptor,
      shapeMetadata = this._getMetadata(shapeDrawer, particle),
      cachePolicy = shapeMetadata?.cachePolicy ?? CachePolicy.Dynamic,
      resolvedColorMode = this._resolveColorMode(shapeMetadata?.colorMode, fillColor, strokeColor),
      colorMode = shapeMetadata?.tintMode ? TextureColorMode.Single : resolvedColorMode,
      quantizedRadius = this._quantize(drawRadius, radiusQuantization),
      strokeWidth = particle.strokeWidth ?? minStrokeWidth,
      strokePadding = strokeWidth > minStrokeWidth ? Math.ceil(strokeWidth / halfDivider) : zero,
      shapePadding = Math.max(zero, this._quantize(shapeMetadata?.padding ?? zero, radiusQuantization)),
      padding = shapePadding + strokePadding,
      paddedRadius = quantizedRadius + padding,
      key = this._getCacheKey({
        cachePolicy,
        colorMode,
        descriptor,
        fillColor,
        padding,
        particle,
        quantizedRadius,
        strokeColor,
        tintMode: shapeMetadata?.tintMode,
      }),
      cached = this._cache.get(key);

    if (cached) {
      cached.lastAccess = Date.now();

      return cached.canvas;
    }

    const size = Math.max(one, Math.ceil(paddedRadius * halfDivider)),
      canvas = this._canvasPool.getCanvas(size, size),
      context = canvas.getContext("2d", this._container.canvas.settings);

    if (!context) {
      return;
    }

    context.clearRect(zero, zero, canvas.width, canvas.height);
    context.save();

    const halfWidth = canvas.width / halfDivider,
      halfHeight = canvas.height / halfDivider,
      stroke = strokeWidth > minStrokeWidth || !particle.shapeFill;

    context.translate(halfWidth, halfHeight);
    context.lineWidth = strokeWidth;

    if (colorMode === TextureColorMode.Single) {
      context.fillStyle = maskColor;
      context.strokeStyle = maskColor;
    } else {
      if (colorStyles.fill) {
        context.fillStyle = colorStyles.fill;
      }

      if (colorStyles.stroke) {
        context.strokeStyle = colorStyles.stroke;
      }
    }

    const drawData: IShapeDrawData = {
      context,
      delta,
      fill: particle.shapeFill,
      opacity: 1,
      particle,
      pixelRatio: this._container.retina.pixelRatio,
      radius: quantizedRadius,
      stroke,
      transformData: {
        a: 1,
        b: 0,
        c: 0,
        d: 1,
      },
    };

    this._drawEffectLayer(effectDrawer, particle, drawData, EffectLayer.Internal, true);

    shapeDrawer.beforeDraw?.(drawData);

    context.beginPath();
    shapeDrawer.draw(drawData);

    if (particle.shapeClose) {
      context.closePath();
    }

    if (stroke) {
      context.stroke();
    }

    if (particle.shapeFill) {
      context.fill();
    }

    shapeDrawer.afterDraw?.(drawData);

    this._drawEffectLayer(effectDrawer, particle, drawData, EffectLayer.Internal, false);

    context.restore();

    if (colorMode === TextureColorMode.Single && shapeMetadata?.tintMode) {
      const tintColor = this._getTintColor(fillColor, strokeColor);

      if (tintColor) {
        context.save();

        // Save the original shape for masking
        const maskCanvas = this._canvasPool.getCanvas(canvas.width, canvas.height),
          maskContext = maskCanvas.getContext("2d");

        if (maskContext) {
          maskContext.drawImage(canvas, zero, zero);

          // Apply color tint
          const compositeOp = shapeMetadata.tintMode ?? "source-in";
          context.globalCompositeOperation = compositeOp;
          context.fillStyle = getStyleFromHsl(tintColor, this._container.hdr, one);
          context.fillRect(zero, zero, canvas.width, canvas.height);

          // Mask with original shape to preserve transparency
          context.globalCompositeOperation = "destination-in";
          context.drawImage(maskCanvas, zero, zero);

          this._canvasPool.returnCanvas(maskCanvas);
        }

        context.restore();
      }
    }

    this._cache.set(key, { canvas, lastAccess: Date.now() });
    this._textureRadiusMap.set(canvas, quantizedRadius);

    if (this._cache.size > maxCacheSize) {
      this._evictOldest();
    }

    return canvas;
  }

  getTextureRadius(canvas: HTMLCanvasElement): number | undefined {
    return this._textureRadiusMap.get(canvas);
  }

  private readonly _drawEffectLayer = (
    effectDrawer: IEffectDrawer | undefined,
    particle: Particle,
    data: IShapeDrawData,
    layer: EffectLayer,
    before: boolean,
  ): void => {
    if (!effectDrawer) {
      return;
    }

    const effectLayer = this.getEffectLayer(effectDrawer, particle);

    if (effectLayer !== layer) {
      return;
    }

    if (before) {
      effectDrawer.drawBefore?.(data);
    } else {
      effectDrawer.drawAfter?.(data);
    }
  };

  private readonly _evictOldest = (): void => {
    let oldestKey: string | undefined,
      oldestTime = Date.now();

    for (const [key, entry] of this._cache) {
      if (entry.lastAccess < oldestTime) {
        oldestTime = entry.lastAccess;
        oldestKey = key;
      }
    }

    if (!oldestKey) {
      return;
    }

    const entry = this._cache.get(oldestKey);

    if (entry) {
      this._canvasPool.returnCanvas(entry.canvas);
      this._textureRadiusMap.delete(entry.canvas);
    }

    this._cache.delete(oldestKey);
  };

  private readonly _getCacheKey = (data: TextureKeyData): string => {
    const { cachePolicy, colorMode, descriptor, fillColor, padding, particle, quantizedRadius, strokeColor, tintMode } =
        data,
      parts = [descriptor, `r:${quantizedRadius}`, `mode:${colorMode}`];

    if (tintMode) {
      parts.push(`tint:${tintMode}`);
    }

    const fillKey = this._quantizeHsl(fillColor),
      strokeKey = this._quantizeHsl(strokeColor);

    if (cachePolicy === CachePolicy.Particle) {
      parts.push(`p:${particle.id}`);
    }

    if (padding > zero) {
      parts.push(`pad:${padding}`);
    }

    if (fillKey) {
      parts.push(`f:${fillKey}`);
    }

    if (strokeKey) {
      parts.push(`s:${strokeKey}`);
    }

    return parts.join("|");
  };

  private readonly _getDescriptor = (
    component: { getDescriptor?: (particle: Particle) => string } | undefined,
    particle: Particle,
    fallback: string,
  ): string => {
    return component?.getDescriptor?.(particle) ?? fallback;
  };

  private readonly _getMetadata = (
    component: { getMetadata?: (particle: Particle) => ITextureMetadata | undefined } | undefined,
    particle: Particle,
  ): ITextureMetadata | undefined => {
    if (!component?.getMetadata) {
      return;
    }

    return component.getMetadata(particle);
  };

  private readonly _getTintColor = (fillColor?: IHsl, strokeColor?: IHsl): IHsl | undefined => {
    return this._quantizeHslObject(fillColor ?? strokeColor);
  };

  private readonly _quantize = (value: number, step: number): number => {
    return Math.round(value / step) * step;
  };

  private readonly _quantizeHsl = (hsl?: IHsl): string | undefined => {
    if (!hsl) {
      return;
    }

    const h = this._quantize(hsl.h, hueQuantization),
      s = Math.round(hsl.s),
      l = Math.round(hsl.l);

    return `${h}:${s}:${l}`;
  };

  private readonly _quantizeHslObject = (hsl?: IHsl): IHsl | undefined => {
    if (!hsl) {
      return;
    }

    return {
      h: this._quantize(hsl.h, hueQuantization),
      s: Math.round(hsl.s),
      l: Math.round(hsl.l),
    };
  };

  private readonly _resolveColorMode = (
    requestedMode: TextureColorMode | undefined,
    fillColor: IHsl | undefined,
    strokeColor: IHsl | undefined,
  ): TextureColorMode => {
    const mode = requestedMode ?? TextureColorMode.Single;

    if (mode === TextureColorMode.Multi) {
      return mode;
    }

    if (!fillColor || !strokeColor) {
      return mode;
    }

    const sameColor = fillColor.h === strokeColor.h && fillColor.s === strokeColor.s && fillColor.l === strokeColor.l;

    return sameColor ? TextureColorMode.Single : TextureColorMode.Multi;
  };
}
