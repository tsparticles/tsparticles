import {
  Circle,
  type Engine,
  type ICoordinates,
  type IDimension,
  type IRgb,
  type RecursivePartial,
  getDistances,
  getLinkColor,
  getLinkRandomColor,
  originPoint,
} from "@tsparticles/engine";
import type { IParticlesLinkOptions, LinkContainer, LinkParticle, ParticlesLinkOptions } from "./Types.js";
import { CircleWarp } from "./CircleWarp.js";
import { Links } from "./Options/Classes/Links.js";
import { ParticlesInteractorBase } from "@tsparticles/plugin-interactivity";

const opacityOffset = 1,
  minDistance = 0;

/* calculates the shortest distance between two points considering canvas wrap */
/**
 * calculates the shortest distance between two points considering canvas wrap
 * @param pos1 - the first point
 * @param pos2 - the second point
 * @param canvasSize - the canvas size
 * @returns shortest distance between two points considering canvas wrap
 */
function getWarpDistance(pos1: ICoordinates, pos2: ICoordinates, canvasSize: IDimension): number {
  const { dx, dy } = getDistances(pos1, pos2),
    absDiffs = { x: Math.abs(dx), y: Math.abs(dy) },
    warpDistances = {
      x: Math.min(absDiffs.x, canvasSize.width - absDiffs.x),
      y: Math.min(absDiffs.y, canvasSize.height - absDiffs.y),
    };

  return Math.hypot(warpDistances.x, warpDistances.y);
}

export class Linker extends ParticlesInteractorBase<LinkContainer, LinkParticle> {
  private readonly _engine;

  constructor(container: LinkContainer, engine: Engine) {
    super(container);

    this._engine = engine;
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

    const pos1 = p1.getPosition(),
      container = this.container,
      canvasSize = container.canvas.size;

    if (pos1.x < originPoint.x || pos1.y < originPoint.y || pos1.x > canvasSize.width || pos1.y > canvasSize.height) {
      return;
    }

    const linkOpt1 = p1.options.links,
      optOpacity = linkOpt1.opacity,
      optDistance = p1.retina.linksDistance ?? minDistance,
      warp = linkOpt1.warp,
      range = warp ? new CircleWarp(pos1.x, pos1.y, optDistance, canvasSize) : new Circle(pos1.x, pos1.y, optDistance),
      query = container.particles.quadTree.query(range) as LinkParticle[];

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
      const distDirect = getDistances(pos1, pos2).distance,
        distWarp = warp && linkOpt2.warp ? getWarpDistance(pos1, pos2, canvasSize) : distDirect,
        distance = Math.min(distDirect, distWarp);

      if (distance > optDistance) {
        continue;
      }

      const opacityLine = (opacityOffset - distance / optDistance) * optOpacity;

      this._setColor(p1);

      p1.links.push({
        destination: p2,
        opacity: opacityLine,
        color: this._getLinkColor(p1, p2),
        /* the link is warped if the shortest path crosses boundaries */
        isWarped: distWarp < distDirect,
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
    options.links ??= new Links();
    for (const source of sources) {
      options.links.load(source?.links);
    }
  }

  reset(): void {
    // do nothing
  }

  private _getLinkColor(p1: LinkParticle, p2: LinkParticle): IRgb | undefined {
    const container = this.container,
      linksOptions = p1.options.links;

    if (!linksOptions) {
      return;
    }

    const linkColor =
      linksOptions.id !== undefined
        ? container.particles.linksColors.get(linksOptions.id)
        : container.particles.linksColor;

    return getLinkColor(p1, p2, linkColor);
  }

  private _setColor(p1: LinkParticle): void {
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

    linkColor = getLinkRandomColor(this._engine, linksOptions.color, linksOptions.blink, linksOptions.consent);

    if (linksOptions.id === undefined) {
      container.particles.linksColor = linkColor;
    } else {
      container.particles.linksColors.set(linksOptions.id, linkColor);
    }
  }
}
