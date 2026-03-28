import {
  type IContainerPlugin,
  type IRgb,
  type PluginManager,
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
  private readonly _colorCache = new Map<string, string>();
  private readonly _container: LinkContainer;
  private readonly _freqs: IParticlesFrequencies;
  private readonly _pluginManager;

  constructor(container: LinkContainer, pluginManager: PluginManager) {
    this._container = container;
    this._pluginManager = pluginManager;
    this._freqs = { links: new Map(), triangles: new Map() };
  }

  drawParticle(context: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D, particle: LinkParticle): void {
    const { links, options } = particle;

    if (!links?.length || !options.links) {
      return;
    }

    const linkOpts = options.links,
      width = particle.retina.linksWidth ?? minWidth,
      pos1 = particle.getPosition(),
      twinkle = (particle.options["twinkle"] as ITwinkle | undefined)?.links,
      trianglesEnabled = linkOpts.triangles.enable,
      p1Destinations = trianglesEnabled ? new Set(links.map(l => l.destination.id)) : null,
      originalAlpha = context.globalAlpha;

    let currentColorStyle = "",
      currentWidth = -1,
      currentAlpha = -1,
      pathOpen = false;

    const flushLines = (): void => {
      if (pathOpen) {
        context.stroke();
        pathOpen = false;
      }
    };

    for (const link of links) {
      if (
        linkOpts.frequency < maxFrequency &&
        this._getLinkFrequency(particle, link.destination) > linkOpts.frequency
      ) {
        continue;
      }

      const pos2 = link.destination.getPosition();

      if (trianglesEnabled && !link.isWarped && p1Destinations) {
        flushLines();
        this._drawTriangles(options, particle, link, p1Destinations, pos1, pos2, context);
      }

      if (link.opacity <= minOpacity || width <= minWidth) {
        continue;
      }

      if (!linkOpts.enable) {
        continue;
      }

      let opacity = link.opacity,
        colorLine = link.color;

      const twinkleRgb =
        twinkle?.enable && getRandom() < twinkle.frequency
          ? rangeColorToRgb(this._pluginManager, twinkle.color)
          : undefined;

      if (twinkle && twinkleRgb) {
        colorLine = twinkleRgb;
        opacity = getRangeValue(twinkle.opacity);
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

      const colorStyle = this._getCachedStyle(colorLine);

      if (colorStyle !== currentColorStyle || width !== currentWidth || opacity !== currentAlpha) {
        flushLines();

        context.strokeStyle = colorStyle;
        context.lineWidth = width;
        context.globalAlpha = opacity;

        currentColorStyle = colorStyle;
        currentWidth = width;
        currentAlpha = opacity;

        context.beginPath();

        pathOpen = true;
      }

      if (link.isWarped) {
        const canvasSize = this._container.canvas.size,
          dx = pos2.x - pos1.x,
          dy = pos2.y - pos1.y;

        let sx = originPoint.x,
          sy = originPoint.y;

        if (Math.abs(dx) > canvasSize.width * half) {
          sx = dx > minDistance ? -canvasSize.width : canvasSize.width;
        }

        if (Math.abs(dy) > canvasSize.height * half) {
          sy = dy > minDistance ? -canvasSize.height : canvasSize.height;
        }

        context.moveTo(pos1.x, pos1.y);
        context.lineTo(pos2.x + sx, pos2.y + sy);
        context.moveTo(pos1.x - sx, pos1.y - sy);
        context.lineTo(pos2.x, pos2.y);
      } else {
        context.moveTo(pos1.x, pos1.y);
        context.lineTo(pos2.x, pos2.y);
      }
    }

    flushLines();

    context.globalAlpha = originalAlpha;
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

  private _drawTriangles(
    options: ParticlesLinkOptions,
    p1: LinkParticle,
    link: ILink,
    p1Destinations: Set<number>,
    pos1: ReturnType<LinkParticle["getPosition"]>,
    pos2: ReturnType<LinkParticle["getPosition"]>,
    context: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
  ): void {
    const p2 = link.destination,
      triangleOptions = options.links?.triangles;

    if (!triangleOptions?.enable || !p2.options.links?.triangles.enable) {
      return;
    }

    const p2Links = p2.links;

    if (!p2Links?.length) {
      return;
    }

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
        colorTriangle = rangeColorToRgb(this._pluginManager, triangleOptions.color) ?? link.color;

      if (!colorTriangle || opacityTriangle <= minOpacity) {
        continue;
      }

      const pos3 = p3.getPosition();

      /* triangles each have independent fill state so save/restore is still
       * needed here — triangles are typically far fewer than lines */
      context.save();
      context.fillStyle = this._getCachedStyle(colorTriangle);
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
