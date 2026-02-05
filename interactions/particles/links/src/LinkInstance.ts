import {
  type Engine,
  type IContainerPlugin,
  type IRgb,
  getLinkColor as engineGetLinkColor,
  getRandom,
  getRangeValue,
  getStyleFromRgb,
  half,
  originPoint,
  rangeColorToRgb,
} from "@tsparticles/engine";
import type { ILink, IParticlesFrequencies, ITwinkle } from "./Interfaces.js";
import type { LinkBatch, LinkContainer, LinkParticle, ParticlesLinkOptions, TriangleBatch } from "./Types.js";
import { setLinkFrequency } from "./Utils.js";

/* Constants for linter satisfaction - No Magic Numbers */
const minOpacity = 0,
  minDistance = 0,
  minWidth = 0,
  maxFrequency = 1,
  defaultFrequency = 0,
  opacitySteps = 10,
  defaultWidth = 0,
  triangleCoordsCount = 6,
  lineCoordsCount = 4,
  x1Offset = 0,
  y1Offset = 1,
  x2Offset = 2,
  y2Offset = 3,
  x3Offset = 4,
  y3Offset = 5;

export class LinkInstance implements IContainerPlugin {
  private readonly _colorCache = new Map<string, string>();
  private readonly _container: LinkContainer;
  private readonly _engine: Engine;
  private readonly _freqs: IParticlesFrequencies;
  private readonly _lineBatches = new Map<string, LinkBatch>();
  private readonly _triangleBatches = new Map<string, TriangleBatch>();

  constructor(container: LinkContainer, engine: Engine) {
    this._container = container;
    this._engine = engine;
    this._freqs = { links: new Map(), triangles: new Map() };
  }

  /**
   * Main draw call - processes all batched links and triangles
   * @param context - the canvas 2D context
   */
  draw(context: CanvasRenderingContext2D): void {
    /* Rendering triangle batches */
    for (const [, batch] of this._triangleBatches) {
      context.save();
      context.fillStyle = batch.colorStyle;
      context.globalAlpha = batch.opacity;
      context.beginPath();

      for (let i = 0; i < batch.coords.length; i += triangleCoordsCount) {
        /* Nullish coalescing avoids ESLint non-null assertion errors and TS undefined errors */
        const x1 = batch.coords[i + x1Offset] ?? originPoint.x,
          y1 = batch.coords[i + y1Offset] ?? originPoint.y,
          x2 = batch.coords[i + x2Offset] ?? originPoint.x,
          y2 = batch.coords[i + y2Offset] ?? originPoint.y,
          x3 = batch.coords[i + x3Offset] ?? originPoint.x,
          y3 = batch.coords[i + y3Offset] ?? originPoint.y;

        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.lineTo(x3, y3);
      }

      context.fill();
      context.restore();
    }

    /* Rendering line batches */
    for (const [, batch] of this._lineBatches) {
      context.save();
      context.strokeStyle = batch.colorStyle;
      context.lineWidth = batch.width;
      context.globalAlpha = batch.opacity;
      context.beginPath();

      for (let i = 0; i < batch.coords.length; i += lineCoordsCount) {
        /* Safely extract coordinates using constant offsets */
        const x1 = batch.coords[i + x1Offset] ?? originPoint.x,
          y1 = batch.coords[i + y1Offset] ?? originPoint.y,
          x2 = batch.coords[i + x2Offset] ?? originPoint.x,
          y2 = batch.coords[i + y2Offset] ?? originPoint.y;

        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
      }

      context.stroke();
      context.restore();
    }

    /* Clear batches for the next frame */
    this._lineBatches.clear();
    this._triangleBatches.clear();
  }

  /**
   * Analyzes a particle and collects its links into the drawing batches
   * @param _context - unused in batching mode
   * @param particle - the particle to process
   */
  drawParticle(_context: CanvasRenderingContext2D, particle: LinkParticle): void {
    const { links, options } = particle;

    if (!links?.length || !options.links) {
      return;
    }

    const canvasSize = this._container.canvas.size,
      p1Links = links.filter(
        l =>
          options.links &&
          (options.links.frequency >= maxFrequency ||
            this._getLinkFrequency(particle, l.destination) <= options.links.frequency),
      ),
      pos1 = particle.getPosition();

    for (const link of p1Links) {
      /* Skip triangles if the link is warped to prevent visual artifacts */
      if (!link.isWarped) {
        this._collectTriangles(options, particle, link, p1Links);
      }

      if (link.opacity > minOpacity && (particle.retina.linksWidth ?? minWidth) > minWidth) {
        let opacity = link.opacity,
          colorLine = link.color;

        const twinkle = (particle.options["twinkle"] as ITwinkle | undefined)?.lines;

        if (twinkle?.enable && getRandom() < twinkle.frequency) {
          const twinkleRgb = rangeColorToRgb(this._engine, twinkle.color);

          if (twinkleRgb) {
            colorLine = twinkleRgb;
            opacity = getRangeValue(twinkle.opacity);
          }
        }

        if (!colorLine) {
          const linkColor =
            options.links.id !== undefined
              ? this._container.particles.linksColors.get(options.links.id)
              : this._container.particles.linksColor;

          colorLine = engineGetLinkColor(particle, link.destination, linkColor);
        }

        if (colorLine) {
          const qOpacity = Math.ceil(opacity * opacitySteps) / opacitySteps,
            colorStyle = this._getCachedStyle(colorLine),
            width = particle.retina.linksWidth ?? defaultWidth,
            key = `${colorStyle}_${qOpacity}_${width}`;

          let batch = this._lineBatches.get(key);

          if (!batch) {
            batch = { colorStyle, opacity: qOpacity, width, coords: [] };

            this._lineBatches.set(key, batch);
          }

          const pos2 = link.destination.getPosition();

          if (link.isWarped) {
            /* Warp logic: calculate virtual positions beyond boundaries for clipping */
            const dx = pos2.x - pos1.x,
              dy = pos2.y - pos1.y;

            let sx = originPoint.x,
              sy = originPoint.y;

            if (Math.abs(dx) > canvasSize.width * half) {
              sx = dx > minDistance ? -canvasSize.width : canvasSize.width;
            }

            if (Math.abs(dy) > canvasSize.height * half) {
              sy = dy > minDistance ? -canvasSize.height : canvasSize.height;
            }

            const v2 = { x: pos2.x + sx, y: pos2.y + sy },
              v1 = { x: pos1.x - sx, y: pos1.y - sy };

            /* Push both segments of the warped link */
            batch.coords.push(pos1.x, pos1.y, v2.x, v2.y);
            batch.coords.push(v1.x, v1.y, pos2.x, pos2.y);
          } else {
            /* standard link */
            batch.coords.push(pos1.x, pos1.y, pos2.x, pos2.y);
          }
        }
      }
    }
  }

  /**
   * Plugin initialization
   */
  async init(): Promise<void> {
    this._freqs.links.clear();
    this._freqs.triangles.clear();
    this._colorCache.clear();

    await Promise.resolve();
  }

  /**
   * Called when a particle is created, initializes link properties
   * @param particle - the created particle
   */
  particleCreated(particle: LinkParticle): void {
    particle.links = [];

    if (!particle.options.links) {
      return;
    }

    const ratio = this._container.retina.pixelRatio;

    particle.retina.linksDistance = particle.options.links.distance * ratio;
    particle.retina.linksWidth = particle.options.links.width * ratio;
  }

  /**
   * Called when a particle is destroyed
   * @param particle - the destroyed particle
   */
  particleDestroyed(particle: LinkParticle): void {
    particle.links = [];
  }

  private _collectTriangles(options: ParticlesLinkOptions, p1: LinkParticle, link: ILink, p1Links: ILink[]): void {
    const p2 = link.destination,
      triangleOptions = options.links?.triangles;

    if (!triangleOptions?.enable || !p2.options.links?.triangles.enable) {
      return;
    }

    const vertices = p2.links?.filter(t => {
      return (
        !t.isWarped &&
        p2.options.links &&
        this._getLinkFrequency(p2, t.destination) <= p2.options.links.frequency &&
        p1Links.some(l => l.destination === t.destination)
      );
    });

    if (!vertices?.length) {
      return;
    }

    for (const vertex of vertices) {
      const p3 = vertex.destination;

      if (this._getTriangleFrequency(p1, p2, p3) > (options.links?.triangles.frequency ?? defaultFrequency)) {
        continue;
      }

      const opacityTriangle = Math.ceil((link.opacity + vertex.opacity) * half * opacitySteps) / opacitySteps,
        colorTriangle = rangeColorToRgb(this._engine, triangleOptions.color) ?? link.color;

      if (!colorTriangle) {
        continue;
      }

      const colorStyle = this._getCachedStyle(colorTriangle),
        key = `${colorStyle}_${opacityTriangle}`;

      let batch = this._triangleBatches.get(key);

      if (!batch) {
        batch = { colorStyle, opacity: opacityTriangle, coords: [] };
        this._triangleBatches.set(key, batch);
      }

      const pos1 = p1.getPosition(),
        pos2 = p2.getPosition(),
        pos3 = p3.getPosition();

      batch.coords.push(pos1.x, pos1.y, pos2.x, pos2.y, pos3.x, pos3.y);
    }
  }

  private _getCachedStyle(rgb: IRgb): string {
    const key = `${rgb.r},${rgb.g},${rgb.b}`;

    let style = this._colorCache.get(key);

    if (!style) {
      style = getStyleFromRgb(rgb, this._container.hdr);

      this._colorCache.set(key, style);
    }

    return style;
  }

  private _getLinkFrequency(p1: LinkParticle, p2: LinkParticle): number {
    return setLinkFrequency([p1, p2], this._freqs.links);
  }

  private _getTriangleFrequency(p1: LinkParticle, p2: LinkParticle, p3: LinkParticle): number {
    return setLinkFrequency([p1, p2, p3], this._freqs.triangles);
  }
}
