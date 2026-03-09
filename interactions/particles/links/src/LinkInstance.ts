import {
  type Engine,
  type IContainerPlugin,
  getLinkColor as engineGetLinkColor,
  getRandom,
  getRangeValue,
  getStyleFromRgb,
  half,
  originPoint,
  rangeColorToRgb,
} from "@tsparticles/engine";
import type { ILink, IParticlesFrequencies, ITwinkle } from "./Interfaces.js";
import type { LinkContainer, LinkParticle, ParticlesLinkOptions } from "./Types.js";
import { setLinkFrequency } from "./Utils.js";

const minOpacity = 0,
  minWidth = 0,
  minDistance = 0,
  maxFrequency = 1,
  defaultFrequency = 0;

export class LinkInstance implements IContainerPlugin {
  private readonly _container: LinkContainer;
  private readonly _engine: Engine;
  private readonly _freqs: IParticlesFrequencies;

  constructor(container: LinkContainer, engine: Engine) {
    this._container = container;
    this._engine = engine;
    this._freqs = { links: new Map(), triangles: new Map() };
  }

  drawParticle(context: CanvasRenderingContext2D, particle: LinkParticle): void {
    const { links, options } = particle;

    if (!links?.length || !options.links) {
      return;
    }

    const pos1 = particle.getPosition(),
      linkOpts = options.links;

    for (const link of links) {
      if (
        linkOpts.frequency < maxFrequency &&
        this._getLinkFrequency(particle, link.destination) > linkOpts.frequency
      ) {
        continue;
      }

      if (!link.isWarped) {
        this._drawTriangles(options, particle, link, links, pos1, context);
      }

      if (link.opacity <= minOpacity || (particle.retina.linksWidth ?? minWidth) <= minWidth) {
        continue;
      }

      this._drawLinkLine(context, particle, link, pos1);
    }
  }

  init(): Promise<void> {
    this._freqs.links.clear();
    this._freqs.triangles.clear();
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

  private _drawLinkLine(
    context: CanvasRenderingContext2D,
    p1: LinkParticle,
    link: ILink,
    pos1: ReturnType<LinkParticle["getPosition"]>,
  ): void {
    const linkOpts = p1.options.links;

    if (!linkOpts?.enable) {
      return;
    }

    let opacity = link.opacity,
      colorLine = link.color;

    const twinkle = (p1.options["twinkle"] as ITwinkle | undefined)?.links;

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

      colorLine = engineGetLinkColor(p1, link.destination, linkColor);
    }

    if (!colorLine) {
      return;
    }

    const width = p1.retina.linksWidth ?? minWidth,
      pos2 = link.destination.getPosition(),
      canvasSize = this._container.canvas.size;

    context.save();
    context.lineWidth = width;
    context.strokeStyle = getStyleFromRgb(colorLine, this._container.hdr);
    context.globalAlpha = opacity;
    context.beginPath();

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

      /* draw the two half-segments that cross the canvas boundary */
      context.moveTo(pos1.x, pos1.y);
      context.lineTo(pos2.x + sx, pos2.y + sy);
      context.moveTo(pos1.x - sx, pos1.y - sy);
      context.lineTo(pos2.x, pos2.y);
    } else {
      context.moveTo(pos1.x, pos1.y);
      context.lineTo(pos2.x, pos2.y);
    }

    context.stroke();
    context.restore();
  }

  private _drawTriangles(
    options: ParticlesLinkOptions,
    p1: LinkParticle,
    link: ILink,
    p1Links: ILink[],
    pos1: ReturnType<LinkParticle["getPosition"]>,
    context: CanvasRenderingContext2D,
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

      const opacityTriangle = triangleOptions.opacity ?? (link.opacity + vertex.opacity) * half,
        colorTriangle = rangeColorToRgb(this._engine, triangleOptions.color) ?? link.color;

      if (!colorTriangle || opacityTriangle <= minOpacity) {
        continue;
      }

      const pos3 = p3.getPosition();

      context.save();
      context.fillStyle = getStyleFromRgb(colorTriangle, this._container.hdr);
      context.globalAlpha = opacityTriangle;
      context.beginPath();
      context.moveTo(pos1.x, pos1.y);
      context.lineTo(pos2.x, pos2.y);
      context.lineTo(pos3.x, pos3.y);
      context.closePath();
      context.fill();
      context.restore();
    }
  }

  private _getLinkFrequency(p1: LinkParticle, p2: LinkParticle): number {
    return setLinkFrequency([p1, p2], this._freqs.links);
  }

  private _getTriangleFrequency(p1: LinkParticle, p2: LinkParticle, p3: LinkParticle): number {
    return setLinkFrequency([p1, p2, p3], this._freqs.triangles);
  }
}
