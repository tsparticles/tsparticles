import {
  type IContainerPlugin,
  type IOklcha,
  type PluginManager,
  getLinkColor as engineGetLinkColor,
  getRandom,
  getRangeValue,
  getStyleFromOklch,
  half,
  originPoint,
  rangeColorToOklch,
} from "@tsparticles/engine";
import type { ILink, IParticlesFrequencies, ITwinkle } from "./Interfaces.js";
import type { LinkContainer, LinkParticle, ParticlesLinkOptions } from "./Types.js";
import { setLinkFrequency } from "./Utils.js";

const minOpacity = 0,
  minWidth = 0,
  minDistance = 0,
  maxFrequency = 1,
  defaultFrequency = 0,
  maxColorCacheSize = 2000;

export class LinkInstance implements IContainerPlugin {
  readonly #colorCache = new Map<string, string>();
  readonly #container: LinkContainer;
  readonly #freqs: IParticlesFrequencies;
  #lastStyle?: {
    color: IOklcha;
    hdr: LinkContainer["hdr"];
    hdrMode: LinkContainer["hdrMode"];
    outputColorSpace: LinkContainer["outputColorSpace"];
    peakNits: LinkContainer["peakNits"];
    style: string;
  };

  readonly #pluginManager: PluginManager;

  constructor(pluginManager: PluginManager, container: LinkContainer) {
    this.#pluginManager = pluginManager;
    this.#container = container;
    this.#freqs = { links: new Map(), triangles: new Map() };
  }

  drawParticle(context: OffscreenCanvasRenderingContext2D, particle: LinkParticle): void {
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
      },
      neutralFill =
        !trianglesEnabled &&
        !twinkle?.enable &&
        typeof context.save === "function" &&
        typeof context.restore === "function" &&
        links.every(link => !!link.color);

    // A stroke-only pass never uses fill paint; restore it natively without rounding its color.
    if (neutralFill) {
      context.save();
      context.fillStyle = "transparent";
    }

    try {
      for (const link of links) {
        if (
          linkOpts.frequency < maxFrequency &&
          this.#getLinkFrequency(particle, link.destination) > linkOpts.frequency
        ) {
          continue;
        }

        const pos2 = link.destination.getPosition();

        if (trianglesEnabled && !link.isWarped && p1Destinations) {
          flushLines();
          this.#drawTriangles(options, particle, link, p1Destinations, pos1, pos2, context);
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
          twinkle?.enable && getRandom(this.#container.engine.getRandomFn()) < twinkle.frequency
            ? rangeColorToOklch(this.#pluginManager, twinkle.color)
            : undefined;

        if (twinkle && twinkleRgb) {
          colorLine = twinkleRgb;
          opacity = getRangeValue(twinkle.opacity, this.#container.engine.getRandomFn());
        }

        if (!colorLine) {
          const linkColor =
            linkOpts.id !== undefined
              ? this.#container.particles.linksColors.get(linkOpts.id)
              : this.#container.particles.linksColor;

          colorLine = engineGetLinkColor(particle, link.destination, linkColor);
        }

        if (!colorLine) {
          continue;
        }

        const colorStyle = this.#getCachedStyle(colorLine);

        if (colorStyle !== currentColorStyle || width !== currentWidth || opacity !== currentAlpha) {
          flushLines();

          if (colorStyle !== currentColorStyle) {
            context.strokeStyle = colorStyle;
          }

          if (width !== currentWidth) {
            context.lineWidth = width;
          }

          if (opacity !== currentAlpha) {
            context.globalAlpha = opacity;
          }

          currentColorStyle = colorStyle;
          currentWidth = width;
          currentAlpha = opacity;

          context.beginPath();

          pathOpen = true;
        }

        if (link.isWarped) {
          const canvasSize = this.#container.canvas.size,
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
    } finally {
      if (neutralFill) {
        context.restore();

        // Keep the same outgoing stroke state as the ordinary link path.
        if (currentColorStyle) {
          context.strokeStyle = currentColorStyle;
          context.lineWidth = currentWidth;
        }
      } else {
        context.globalAlpha = originalAlpha;
      }
    }
  }

  init(): Promise<void> {
    this.#freqs.links.clear();
    this.#freqs.triangles.clear();
    this.#colorCache.clear();
    this.#lastStyle = undefined;

    return Promise.resolve();
  }

  particleCreated(particle: LinkParticle): void {
    particle.links = [];

    if (!particle.options.links) {
      return;
    }

    particle.linksDistance = particle.options.links.distance;
    particle.linksWidth = particle.options.links.width;

    const ratio = this.#container.retina.pixelRatio;

    particle.retina.linksDistance = particle.linksDistance * ratio;
    particle.retina.linksWidth = particle.linksWidth * ratio;
  }

  particleDestroyed(particle: LinkParticle): void {
    particle.links = [];
  }

  #drawTriangles(
    options: ParticlesLinkOptions,
    p1: LinkParticle,
    link: ILink,
    p1Destinations: Set<number>,
    pos1: ReturnType<LinkParticle["getPosition"]>,
    pos2: ReturnType<LinkParticle["getPosition"]>,
    context: OffscreenCanvasRenderingContext2D,
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
        this.#getLinkFrequency(p2, vertex.destination) > p2.options.links.frequency ||
        !p1Destinations.has(vertex.destination.id)
      ) {
        continue;
      }

      const p3 = vertex.destination;

      if (this.#getTriangleFrequency(p1, p2, p3) > (options.links?.triangles.frequency ?? defaultFrequency)) {
        continue;
      }

      const opacityTriangle = triangleOptions.opacity ?? (link.opacity + vertex.opacity) * half,
        colorTriangle = rangeColorToOklch(this.#pluginManager, triangleOptions.color) ?? link.color;

      if (!colorTriangle || opacityTriangle <= minOpacity) {
        continue;
      }

      const pos3 = p3.getPosition();

      /* triangles each have independent fill state so save/restore is still
       * needed here — triangles are typically far fewer than lines */
      context.save();
      context.fillStyle = this.#getCachedStyle(colorTriangle);
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

  #getCachedStyle(color: IOklcha): string {
    const { hdr, hdrMode, outputColorSpace, peakNits } = this.#container,
      last = this.#lastStyle;

    if (
      last?.color.l === color.l &&
      last.color.c === color.c &&
      last.color.h === color.h &&
      last.color.a === color.a &&
      last.hdr === hdr &&
      last.hdrMode === hdrMode &&
      last.outputColorSpace === outputColorSpace &&
      last.peakNits === peakNits
    ) {
      return last.style;
    }

    const key = `${color.l},${color.c},${color.h},${color.a}-${hdr}-${outputColorSpace}-${peakNits}-${hdrMode}`;
    let style = this.#colorCache.get(key);

    if (!style) {
      style = getStyleFromOklch(color, hdr, undefined, peakNits, hdrMode, outputColorSpace);
      if (this.#colorCache.size >= maxColorCacheSize) {
        this.#colorCache.clear();
      }

      this.#colorCache.set(key, style);
    }

    if (last) {
      last.color.l = color.l;
      last.color.c = color.c;
      last.color.h = color.h;
      last.color.a = color.a;
      last.hdr = hdr;
      last.hdrMode = hdrMode;
      last.outputColorSpace = outputColorSpace;
      last.peakNits = peakNits;
      last.style = style;
    } else {
      this.#lastStyle = {
        color: { ...color },
        hdr,
        hdrMode,
        outputColorSpace,
        peakNits,
        style,
      };
    }

    return style;
  }

  #getLinkFrequency(p1: LinkParticle, p2: LinkParticle): number {
    return setLinkFrequency([p1, p2], this.#freqs.links, this.#container.engine.getRandomFn());
  }

  #getTriangleFrequency(p1: LinkParticle, p2: LinkParticle, p3: LinkParticle): number {
    return setLinkFrequency([p1, p2, p3], this.#freqs.triangles, this.#container.engine.getRandomFn());
  }
}
