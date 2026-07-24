import "./pathseg.js";
import {
  type IContainerPlugin,
  type ICoordinates,
  type IDelta,
  type IDimension,
  OutModeDirection,
  type Particle,
  type PluginManager,
  deepExtend,
  double,
  getDistance,
  getDistances,
  getRandom,
  half,
  isArray,
  isString,
  itemFromArray,
  originPoint,
  percentDenominator,
  safeDocument,
} from "@tsparticles/engine";
import { calcClosestPointOnSegment, drawPolygonMask, drawPolygonMaskPath, parsePaths, segmentBounce } from "./utils.js";
import type { ISvgPath } from "./Interfaces/ISvgPath.js";
import type { PolygonMaskContainer } from "./types.js";
import { PolygonMaskInlineArrangement } from "./Enums/PolygonMaskInlineArrangement.js";
import { PolygonMaskType } from "./Enums/PolygonMaskType.js";

const noPolygonDataLoaded = `No polygon data loaded.`,
  noPolygonFound = `No polygon found, you need to specify SVG url in config.`;

/**
 * Polygon Mask manager
 */
export class PolygonMaskInstance implements IContainerPlugin {
  /** The polygon mask dimensions */
  dimension: IDimension;
  /** The polygon mask offset */
  offset?: ICoordinates;
  /** The parsed SVG paths */
  paths?: ISvgPath[];
  /** The raw polygon coordinates */
  raw?: ICoordinates[];
  /** The redraw timeout handle */
  redrawTimeout?: number;

  /** The particles container */
  readonly #container;
  /** The movement radius for inline particles */
  #moveRadius;
  /** The plugin manager */
  readonly #pluginManager;
  /** The scale factor */
  #scale;

  /**
   * Creates a new PolygonMaskInstance
   * @param pluginManager - the plugin manager
   * @param container - the polygon mask container
   */
  constructor(pluginManager: PluginManager, container: PolygonMaskContainer) {
    this.#container = container;
    this.#pluginManager = pluginManager;
    this.dimension = {
      height: 0,
      width: 0,
    };
    this.#moveRadius = 0;
    this.#scale = 1;
  }

  /**
   * Checks if a click position is valid inside the polygon
   * @param position - the click position
   * @returns true if the position is valid
   */
  clickPositionValid(position: ICoordinates): boolean {
    const options = this.#container.actualOptions.polygon;

    return (
      !!options?.enable &&
      options.type !== PolygonMaskType.none &&
      options.type !== PolygonMaskType.inline &&
      this.#checkInsidePolygon(position)
    );
  }

  draw(context: OffscreenCanvasRenderingContext2D): void {
    if (!this.paths?.length) {
      return;
    }

    const options = this.#container.actualOptions.polygon;

    if (!options?.enable) {
      return;
    }

    const polygonDraw = options.draw;

    if (!polygonDraw.enable) {
      return;
    }

    const rawData = this.raw;

    for (const path of this.paths) {
      const path2d = path.path2d;

      if (path2d && this.offset) {
        drawPolygonMaskPath(
          this.#pluginManager,
          context,
          path2d,
          polygonDraw.stroke,
          this.offset,
          this.#container.hdr,
          this.#container.peakNits,
          this.#container.hdrMode,
        );
      } else if (rawData) {
        drawPolygonMask(
          this.#pluginManager,
          context,
          rawData,
          polygonDraw.stroke,
          this.#container.hdr,
          this.#container.peakNits,
          this.#container.hdrMode,
        );
      }
    }
  }

  async init(): Promise<void> {
    const container = this.#container,
      polygonMaskOptions = container.actualOptions.polygon,
      pxRatio = container.retina.pixelRatio;

    if (!polygonMaskOptions) {
      return;
    }

    this.#moveRadius = polygonMaskOptions.move.radius * pxRatio;
    this.#scale = polygonMaskOptions.scale * pxRatio;

    /* If is set the url of svg element, load it and parse into raw polygon data */
    if (polygonMaskOptions.enable) {
      await this.#initRawData();
    }
  }

  particleBounce(particle: Particle, delta: IDelta, direction: OutModeDirection): boolean {
    return this.#polygonBounce(particle, delta, direction);
  }

  particlePosition(position?: ICoordinates): ICoordinates | undefined {
    const options = this.#container.actualOptions.polygon,
      defaultLength = 0;

    if (!(options?.enable && (this.raw?.length ?? defaultLength) > defaultLength)) {
      return;
    }

    return deepExtend({}, position ?? this.#randomPoint()) as ICoordinates;
  }

  particlesInitialization(): boolean {
    const options = this.#container.actualOptions.polygon;

    if (
      options?.enable &&
      options.type === PolygonMaskType.inline &&
      (options.inline.arrangement === PolygonMaskInlineArrangement.onePerPoint ||
        options.inline.arrangement === PolygonMaskInlineArrangement.perPoint)
    ) {
      this.#drawPoints();

      return true;
    }

    return false;
  }

  resize(): void {
    const container = this.#container,
      options = container.actualOptions.polygon;

    if (!(options?.enable && options.type !== PolygonMaskType.none)) {
      return;
    }

    if (this.redrawTimeout) {
      clearTimeout(this.redrawTimeout);
    }

    const timeout = 250;

    this.redrawTimeout = setTimeout(() => {
      void (async (): Promise<void> => {
        await this.#initRawData(true);

        await container.particles.redraw();
      })();
    }, timeout);
  }

  stop(): void {
    delete this.raw;
    delete this.paths;
  }

  #checkInsidePolygon(position?: ICoordinates): boolean {
    const container = this.#container,
      options = container.actualOptions.polygon;

    if (!options?.enable || options.type === PolygonMaskType.none || options.type === PolygonMaskType.inline) {
      return true;
    }

    // https://github.com/substack/point-in-polygon
    // ray-casting algorithm based on
    // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
    if (!this.raw) {
      throw new Error(noPolygonFound);
    }

    const canvasSize = container.canvas.size,
      x = position?.x ?? getRandom() * canvasSize.width,
      y = position?.y ?? getRandom() * canvasSize.height,
      indexOffset = 1;

    let inside = false;

    // if (this.polygonPath && position) {
    //     inside = container.canvas.isPointInPath(this.polygonPath, position);
    // } else {
    for (let i = 0, j = this.raw.length - indexOffset; i < this.raw.length; j = i++) {
      const pi = this.raw[i],
        pj = this.raw[j];

      if (!pi || !pj) {
        continue;
      }

      const intersect = pi.y > y !== pj.y > y && x < ((pj.x - pi.x) * (y - pi.y)) / (pj.y - pi.y) + pi.x;

      if (intersect) {
        inside = !inside;
      }
    }
    // }

    if (options.type === PolygonMaskType.inside) {
      return inside;
    } else {
      return !inside;
    }
  }

  #createPath2D(): void {
    const container = this.#container,
      options = container.actualOptions.polygon;

    if (!options || !this.paths?.length) {
      return;
    }

    for (const path of this.paths) {
      const pathData = path.element.getAttribute("d");

      if (pathData) {
        const path2d = new Path2D(pathData),
          matrix = safeDocument().createElementNS("http://www.w3.org/2000/svg", "svg").createSVGMatrix(),
          finalPath = new Path2D(),
          transform = matrix.scale(this.#scale);

        finalPath.addPath(path2d, transform);

        path.path2d = finalPath;
      } else {
        delete path.path2d;
      }

      if (path.path2d ?? !this.raw) {
        continue;
      }

      path.path2d = new Path2D();

      const firstIndex = 0,
        firstPoint = this.raw[firstIndex];

      if (!firstPoint) {
        continue;
      }

      path.path2d.moveTo(firstPoint.x, firstPoint.y);

      this.raw.forEach((pos, i) => {
        if (i > firstIndex) {
          path.path2d?.lineTo(pos.x, pos.y);
        }
      });

      path.path2d.closePath();
    }
  }

  /**
   * Deprecate SVGPathElement.getPathSegAtLength removed in:
   * Chrome for desktop release 62
   * Chrome for Android release 62
   * Android WebView release 62
   * Opera release 49
   * Opera for Android release 49
   * @param svgUrl - The svgUrl
   * @param force - The force
   * @returns the coordinates of the polygon
   */
  async #downloadSvgPath(svgUrl?: string, force?: boolean): Promise<ICoordinates[] | undefined> {
    const options = this.#container.actualOptions.polygon;

    if (!options) {
      return;
    }

    const url = svgUrl ?? options.url,
      forceDownload = force ?? false;

    // Load SVG from file on server
    if (!url || (this.paths !== undefined && !forceDownload)) {
      return this.raw;
    }

    const req = await fetch(url);

    if (!req.ok) {
      throw new Error(`Error occurred during polygon mask download`);
    }

    return this.#parseSvgPath(await req.text(), force);
  }

  #drawPoints(): void {
    if (!this.raw) {
      return;
    }

    for (const item of this.raw) {
      this.#container.particles.addParticle({
        x: item.x,
        y: item.y,
      });
    }
  }

  #getEquidistantPointByIndex(index: number): ICoordinates | undefined {
    const container = this.#container,
      options = container.actualOptions,
      polygonMaskOptions = options.polygon;

    if (!polygonMaskOptions) {
      return;
    }

    if (!this.raw?.length || !this.paths?.length) {
      throw new Error(noPolygonDataLoaded);
    }

    let offset = 0,
      point: DOMPoint | undefined;

    const baseAccumulator = 0,
      totalLength = this.paths.reduce((tot: number, path: ISvgPath) => tot + path.length, baseAccumulator),
      distance = totalLength / options.particles.number.value;

    for (const path of this.paths) {
      const pathDistance = distance * index - offset;

      if (pathDistance <= path.length) {
        point = path.element.getPointAtLength(pathDistance);

        break;
      } else {
        offset += path.length;
      }
    }

    const scale = this.#scale;

    return {
      x: (point?.x ?? originPoint.x) * scale + (this.offset?.x ?? originPoint.x),
      y: (point?.y ?? originPoint.y) * scale + (this.offset?.y ?? originPoint.y),
    };
  }

  #getPointByIndex(index: number): ICoordinates | undefined {
    if (!this.raw?.length) {
      throw new Error(noPolygonDataLoaded);
    }

    const coords = this.raw[index % this.raw.length];

    if (!coords) {
      return;
    }

    return {
      x: coords.x,
      y: coords.y,
    };
  }

  #getRandomPoint(): ICoordinates | undefined {
    if (!this.raw?.length) {
      throw new Error(noPolygonDataLoaded);
    }

    const coords = itemFromArray(this.raw);

    if (!coords) {
      return;
    }

    return {
      x: coords.x,
      y: coords.y,
    };
  }

  #getRandomPointByLength(): ICoordinates | undefined {
    const container = this.#container,
      options = container.actualOptions.polygon;

    if (!options) {
      return;
    }

    if (!this.raw?.length || !this.paths?.length) {
      throw new Error(noPolygonDataLoaded);
    }

    const path = itemFromArray(this.paths);

    if (!path) {
      return;
    }

    const offset = 1,
      distance = Math.floor(getRandom() * path.length) + offset,
      point = path.element.getPointAtLength(distance),
      scale = this.#scale;

    return {
      x: point.x * scale + (this.offset?.x ?? originPoint.x),
      y: point.y * scale + (this.offset?.y ?? originPoint.y),
    };
  }

  async #initRawData(force?: boolean): Promise<void> {
    const options = this.#container.actualOptions.polygon;

    if (!options) {
      return;
    }

    if (options.url) {
      this.raw = await this.#downloadSvgPath(options.url, force);
    } else if (options.data) {
      const data = options.data;

      let svg: string;

      if (isString(data)) {
        svg = data;
      } else {
        const getPath = (p: string): string => `<path d="${p}" />`,
          path = isArray(data.path) ? data.path.map(getPath).join("") : getPath(data.path),
          namespaces = 'xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"';

        svg = `<svg ${namespaces} width="${data.size.width.toString()}" height="${data.size.height.toString()}">${path}</svg>`;
      }

      this.raw = this.#parseSvgPath(svg, force);
    }

    this.#createPath2D();

    this.#container.dispatchEvent("polygonMaskLoaded");
  }

  #parseSvgPath(xml: string, force?: boolean): ICoordinates[] | undefined {
    const forceDownload = force ?? false;

    if (this.paths !== undefined && !forceDownload) {
      return this.raw;
    }

    const container = this.#container,
      options = container.actualOptions.polygon;

    if (!options) {
      return;
    }

    const parser = new DOMParser(),
      doc = parser.parseFromString(xml, "image/svg+xml"),
      firstIndex = 0,
      svg = doc.getElementsByTagName("svg")[firstIndex];

    if (!svg) {
      return;
    }

    let svgPaths = svg.getElementsByTagName("path");

    if (!svgPaths.length) {
      svgPaths = doc.getElementsByTagName("path");
    }

    this.paths = [];

    for (let i = 0; i < svgPaths.length; i++) {
      const path = svgPaths.item(i);

      if (path) {
        this.paths.push({
          element: path,
          length: path.getTotalLength(),
        });
      }
    }

    const scale = this.#scale;

    this.dimension.width = parseFloat(svg.getAttribute("width") ?? "0") * scale;
    this.dimension.height = parseFloat(svg.getAttribute("height") ?? "0") * scale;

    const position = options.position ?? {
        x: 50,
        y: 50,
      },
      canvasSize = container.canvas.size;

    /* centering of the polygon mask */
    this.offset = {
      x: (canvasSize.width * position.x) / percentDenominator - this.dimension.width * half,
      y: (canvasSize.height * position.y) / percentDenominator - this.dimension.height * half,
    };

    return parsePaths(this.paths, scale, this.offset);
  }

  #polygonBounce(particle: Particle, _delta: IDelta, direction: OutModeDirection): boolean {
    const options = this.#container.actualOptions.polygon;

    if (!this.raw || !options?.enable || direction !== OutModeDirection.top) {
      return false;
    }

    if (options.type === PolygonMaskType.inside || options.type === PolygonMaskType.outside) {
      let closest: ICoordinates | undefined, dx: number | undefined, dy: number | undefined;
      const pos = particle.getPosition(),
        radius = particle.getRadius(),
        offset = 1;

      for (let i = 0, j = this.raw.length - offset; i < this.raw.length; j = i++) {
        const pi = this.raw[i],
          pj = this.raw[j];

        if (!pi || !pj) {
          continue;
        }

        closest = calcClosestPointOnSegment(pi, pj, pos);

        const dist = getDistances(pos, closest);

        [dx, dy] = [dist.dx, dist.dy];

        if (dist.distance < radius) {
          segmentBounce(pi, pj, particle.velocity);

          return true;
        }
      }

      if (closest && dx !== undefined && dy !== undefined && !this.#checkInsidePolygon(pos)) {
        const factor = { x: 1, y: 1 },
          diameter = radius * double,
          inverse = -1;

        if (pos.x >= closest.x) {
          factor.x = -1;
        }

        if (pos.y >= closest.y) {
          factor.y = -1;
        }

        particle.position.x = closest.x + diameter * factor.x;
        particle.position.y = closest.y + diameter * factor.y;

        particle.velocity.mult(inverse);

        return true;
      }
    } else if (options.type === PolygonMaskType.inline) {
      const dist = getDistance(particle.initialPosition, particle.getPosition()),
        { velocity } = particle;

      if (dist > this.#moveRadius) {
        velocity.x = velocity.y * half - velocity.x;
        velocity.y = velocity.x * half - velocity.y;

        return true;
      }
    }

    return false;
  }

  #randomPoint(): ICoordinates | undefined {
    const container = this.#container,
      options = container.actualOptions.polygon;

    if (!options) {
      return;
    }

    let position: ICoordinates | undefined;

    if (options.type === PolygonMaskType.inline) {
      switch (options.inline.arrangement) {
        case PolygonMaskInlineArrangement.randomPoint:
          position = this.#getRandomPoint();
          break;
        case PolygonMaskInlineArrangement.randomLength:
          position = this.#getRandomPointByLength();
          break;
        case PolygonMaskInlineArrangement.equidistant:
          position = this.#getEquidistantPointByIndex(container.particles.count);
          break;
        case PolygonMaskInlineArrangement.onePerPoint:
        case PolygonMaskInlineArrangement.perPoint:
        default:
          position = this.#getPointByIndex(container.particles.count);
      }
    } else {
      const canvasSize = container.canvas.size;

      position = {
        x: getRandom() * canvasSize.width,
        y: getRandom() * canvasSize.height,
      };
    }

    if (this.#checkInsidePolygon(position)) {
      return position;
    } else {
      return this.#randomPoint();
    }
  }
}
