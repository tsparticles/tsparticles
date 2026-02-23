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

  draw(context: CanvasRenderingContext2D): void {
    for (const [, batch] of this._triangleBatches) {
      context.save();
      context.fillStyle = batch.colorStyle;
      context.globalAlpha = batch.opacity;
      context.beginPath();

      for (let i = 0; i < batch.coords.length; i += triangleCoordsCount) {
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

    for (const [, batch] of this._lineBatches) {
      context.save();
      context.strokeStyle = batch.colorStyle;
      context.lineWidth = batch.width;
      context.globalAlpha = batch.opacity;
      context.beginPath();

      for (let i = 0; i < batch.coords.length; i += lineCoordsCount) {
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

    this._lineBatches.clear();
    this._triangleBatches.clear();
  }

  drawParticle(_context: CanvasRenderingContext2D, particle: LinkParticle): void {
    const { links, options } = particle;

    if (!links?.length || !options.links) {
      return;
    }

    const canvasSize = this._container.canvas.size,
      pos1 = particle.getPosition(),
      linkOpts = options.links;

    for (const link of links) {
      if (
        linkOpts.frequency < maxFrequency &&
        this._getLinkFrequency(particle, link.destination) > linkOpts.frequency
      ) {
        continue;
      }

      if (!link.isWarped) {
        this._collectTriangles(options, particle, link, links, pos1);
      }

      if (link.opacity <= minOpacity || (particle.retina.linksWidth ?? minWidth) <= minWidth) {
        continue;
      }

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
          linkOpts.id !== undefined
            ? this._container.particles.linksColors.get(linkOpts.id)
            : this._container.particles.linksColor;

        colorLine = engineGetLinkColor(particle, link.destination, linkColor);
      }

      if (!colorLine) {
        continue;
      }

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

        batch.coords.push(pos1.x, pos1.y, v2.x, v2.y, v1.x, v1.y, pos2.x, pos2.y);
      } else {
        batch.coords.push(pos1.x, pos1.y, pos2.x, pos2.y);
      }
    }
  }

  init(): Promise<void> {
    this._freqs.links.clear();
    this._freqs.triangles.clear();
    this._colorCache.clear();
    return Promise.resolve();
  }

  particleCreated(particle: LinkParticle): void {
    particle.links = [];

    if (!particle.options.links) {
      return;
    }

    particle.linksDistance = particle.options.links.distance;
    particle.linksWidth = particle.options.links.width;

    const ratio = this._container.retina.pixelRatio;

    particle.retina.linksDistance = particle.linksDistance * ratio;
    particle.retina.linksWidth = particle.linksWidth * ratio;
  }

  particleDestroyed(particle: LinkParticle): void {
    particle.links = [];
  }

  private _collectTriangles(
    options: ParticlesLinkOptions,
    p1: LinkParticle,
    link: ILink,
    p1Links: ILink[],
    pos1: ReturnType<LinkParticle["getPosition"]>,
  ): void {
    const p2 = link.destination,
      triangleOptions = options.links?.triangles;

    if (!triangleOptions?.enable || !p2.options.links?.triangles.enable) {
      return;
    }

    const p1Destinations = new Set(p1Links.map(l => l.destination.id)),
      p2Links = p2.links;

    if (!p2Links?.length) {
      return;
    }

    const pos2 = p2.getPosition();

    for (const vertex of p2Links) {
      if (
        vertex.isWarped ||
        this._getLinkFrequency(p2, vertex.destination) > p2.options.links.frequency ||
        !p1Destinations.has(vertex.destination.id)
      ) {
        continue;
      }

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

      const pos3 = p3.getPosition();

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
