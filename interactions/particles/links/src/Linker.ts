import {
  type IDimension,
  type IRgb,
  type PluginManager,
  type RecursivePartial,
  getLinkColor,
  getLinkRandomColor,
  loadOptionProperty,
  originPoint,
} from "@tsparticles/engine";
import type { IParticlesLinkOptions, LinkContainer, LinkParticle, ParticlesLinkOptions } from "./Types.js";
import { CircleWarp } from "./CircleWarp.js";
import { Links } from "./Options/Classes/Links.js";
import { ParticlesInteractorBase } from "@tsparticles/plugin-interactivity";

const opacityOffset = 1,
  minDistance = 0;

/**
 * Calculates the squared distance allowing wrap on either canvas axis.
 * @param dx - the horizontal delta
 * @param dy - the vertical delta
 * @param canvasSize - the canvas size
 * @returns the squared distance with canvas wrapping
 */
function getWarpDistanceSq(dx: number, dy: number, canvasSize: IDimension): number {
  const absX = Math.abs(dx),
    absY = Math.abs(dy),
    x = Math.min(absX, canvasSize.width - absX),
    y = Math.min(absY, canvasSize.height - absY);

  return x * x + y * y;
}

/** Particles link interactor */
export class Linker extends ParticlesInteractorBase<LinkContainer, LinkParticle> {
  #maxDistance;
  readonly #pluginManager;

  constructor(pluginManager: PluginManager, container: LinkContainer) {
    super(container);

    this.#pluginManager = pluginManager;
    this.#maxDistance = 0;
  }

  get maxDistance(): number {
    return this.#maxDistance;
  }

  clear(): void {
    // do nothing
  }

  init(): void {
    this.container.particles.linksColor = undefined;
    this.container.particles.linksColors = new Map();
  }

  interact(p1: LinkParticle): void {
    if (!p1.options.links) {
      return;
    }

    p1.links = [];

    if (p1.linksDistance && p1.linksDistance > this.#maxDistance) {
      this.#maxDistance = p1.linksDistance;
    }

    const pos1 = p1.getPosition(),
      container = this.container,
      canvasSize = container.canvas.size;

    if (pos1.x < originPoint.x || pos1.y < originPoint.y || pos1.x > canvasSize.width || pos1.y > canvasSize.height) {
      return;
    }

    const linkOpt1 = p1.options.links,
      optOpacity = linkOpt1.opacity,
      optDistance = p1.retina.linksDistance ?? minDistance,
      optDistanceSq = optDistance * Math.abs(optDistance),
      warp = linkOpt1.warp,
      query = (
        warp
          ? new CircleWarp(pos1.x, pos1.y, optDistance, canvasSize).query(container.particles.grid)
          : container.particles.grid.queryCircle(pos1, optDistance)
      ) as LinkParticle[];

    for (const p2 of query) {
      const linkOpt2 = p2.options.links;

      if (
        p1 === p2 ||
        !linkOpt2?.enable ||
        linkOpt1.id !== linkOpt2.id ||
        p2.spawning ||
        p2.destroyed ||
        !p2.links ||
        p1.links.some(t => t.destination === p2) ||
        p2.links.some(t => t.destination === p1)
      ) {
        continue;
      }

      const pos2 = p2.getPosition();

      if (pos2.x < originPoint.x || pos2.y < originPoint.y || pos2.x > canvasSize.width || pos2.y > canvasSize.height) {
        continue;
      }

      /* check both direct and warped distances */
      const dx = pos1.x - pos2.x,
        dy = pos1.y - pos2.y,
        distDirectSq = dx * dx + dy * dy,
        distWarpSq = warp && linkOpt2.warp ? getWarpDistanceSq(dx, dy, canvasSize) : distDirectSq,
        distanceSq = Math.min(distDirectSq, distWarpSq);

      if (distanceSq > optDistanceSq) {
        continue;
      }

      const distance = Math.sqrt(distanceSq),
        opacityLine = (opacityOffset - distance / optDistance) * optOpacity;

      this.#setColor(p1);

      p1.links.push({
        destination: p2,
        opacity: opacityLine,
        color: this.#getLinkColor(p1, p2),
        /* the link is warped if the shortest path crosses boundaries */
        isWarped: distWarpSq < distDirectSq,
      });
    }
  }

  isEnabled(particle: LinkParticle): boolean {
    return !!particle.options.links?.enable;
  }

  loadParticlesOptions(
    options: ParticlesLinkOptions,
    ...sources: (RecursivePartial<IParticlesLinkOptions> | undefined)[]
  ): void {
    loadOptionProperty(options, "links", Links, ...sources);
  }

  reset(): void {
    // do nothing
  }

  #getLinkColor(p1: LinkParticle, p2: LinkParticle): IRgb | undefined {
    const container = this.container,
      linksOptions = p1.options.links;

    if (!linksOptions) {
      return;
    }

    const linkColor =
      linksOptions.id !== undefined
        ? container.particles.linksColors.get(linksOptions.id)
        : container.particles.linksColor;

    return getLinkColor(p1, p2, linkColor, container.hdr);
  }

  #setColor(p1: LinkParticle): void {
    if (!p1.options.links) {
      return;
    }

    const container = this.container,
      linksOptions = p1.options.links;

    let linkColor =
      linksOptions.id === undefined
        ? container.particles.linksColor
        : container.particles.linksColors.get(linksOptions.id);

    if (linkColor) {
      return;
    }

    linkColor = getLinkRandomColor(this.#pluginManager, linksOptions.color, linksOptions.blink, linksOptions.consent);

    if (linksOptions.id === undefined) {
      container.particles.linksColor = linkColor;
    } else {
      container.particles.linksColors.set(linksOptions.id, linkColor);
    }
  }
}
