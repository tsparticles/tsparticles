import { ParticlesLibrary } from ".";
import { TPoint } from "./Utils";
import { IPolygonDefinition } from "./IParams";

export interface ISVGPolygonData {
	paths: SVGPathElement[];
	svg: SVGSVGElement;
}

type TSVGAbsoluteCoordinatesTypes =
	| SVGPathSegArcAbs
	| SVGPathSegCurvetoCubicAbs
	| SVGPathSegCurvetoCubicSmoothAbs
	| SVGPathSegCurvetoQuadraticAbs
	| SVGPathSegCurvetoQuadraticSmoothAbs
	| SVGPathSegLinetoAbs
	| SVGPathSegMovetoAbs;

type TSVGRelativeCoordinatesTypes =
	| SVGPathSegArcRel
	| SVGPathSegCurvetoCubicRel
	| SVGPathSegCurvetoCubicSmoothRel
	| SVGPathSegCurvetoQuadraticRel
	| SVGPathSegCurvetoQuadraticSmoothRel
	| SVGPathSegLinetoRel
	| SVGPathSegMovetoRel;

export class PolygonMask {
	private lastCanvasHeight: number;
	private lastCanvasWidth: number;
	private polygonData: ISVGPolygonData;
	private polygonHeight: number;
	private polygonOffsetX: number;
	private polygonOffsetY: number;
	private polygonPath: Path2D;
	private polygonPathLength: number = 0;
	private polygonRaw: Array<[number, number]>;
	private polygonWidth: number;

	private initialized = false;
	private path2DSupported = !!(window as any)["Path2D"];

	private debounceTime = 250;
	private debounceTimer: NodeJS.Timer;

	private polygon: IPolygonDefinition;

	constructor(private library: ParticlesLibrary) {
		this.parseSvgPathToPolygon = this.parseSvgPathToPolygon.bind(this);
	}

	initialize(polygon: IPolygonDefinition): Promise<void> {
		this.polygon = polygon;

		if (!polygon.enable) return Promise.resolve();
		if (!this.initialized) {
			return this.parseSvgPathToPolygon().then(_ => {
				this.initialized = true;
			});
		} else {
			return new Promise<void>(resolve => {
				if (this.debounceTimer) clearTimeout(this.debounceTimer);
				this.debounceTimer = setTimeout(() => {
					this.parseSvgPathToPolygon().then(_ => {
						resolve();
					});
				}, this.debounceTime);
			});
		}
	}

	getVerticesNumber(): number {
		if (!this.initialized) return 0;
		return this.polygonRaw.length;
	}

	parseSvgPathToPolygon(svgUrl?: string): Promise<Array<[number, number]>> {
		svgUrl = svgUrl || this.polygon.url;
		const canvasSizeDidNotChange =
			this.library.canvas.width === this.lastCanvasWidth &&
			this.library.canvas.height === this.lastCanvasHeight;
		if (this.polygonRaw && this.polygonRaw.length && canvasSizeDidNotChange)
			return Promise.resolve(this.polygonRaw);
		return this.parseSvgPath(svgUrl).then(polygonData => {
			this.polygonData = polygonData;
			this.polygonWidth =
				parseInt(this.polygonData.svg.getAttribute("width")) *
				this.polygon.scale;
			this.polygonHeight =
				parseInt(this.polygonData.svg.getAttribute("height")) *
				this.polygon.scale;
			this.polygonOffsetX =
				this.library.canvas.width / 2 - this.polygonWidth / 2;
			this.polygonOffsetY =
				this.library.canvas.height / 2 - this.polygonHeight / 2;
			if (this.polygonData.paths.length) {
				this.polygonPathLength = this.polygonData.paths[0].getTotalLength();
			}
			this.polygonRaw = [];

			this.polygonData.paths.forEach(path => {
				const pathLength = path.pathSegList.numberOfItems;
				for (let a = 0; a < pathLength; a++) {
					let point: { x: number; y: number } = { x: 0, y: 0 };

					const pathSeg = path.pathSegList.getItem(a);
					switch (pathSeg.pathSegType) {
						case SVGPathSeg.PATHSEG_ARC_ABS:
						case SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS:
						case SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS:
						case SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS:
						case SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS:
						case SVGPathSeg.PATHSEG_LINETO_ABS:
						case SVGPathSeg.PATHSEG_MOVETO_ABS:
							point.x = (pathSeg as TSVGAbsoluteCoordinatesTypes).x;
							point.y = (pathSeg as TSVGAbsoluteCoordinatesTypes).y;

						case SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS:
							point.x = (pathSeg as SVGPathSegLinetoHorizontalAbs).x;
							break;

						case SVGPathSeg.PATHSEG_LINETO_VERTICAL_ABS:
							point.y = (pathSeg as SVGPathSegLinetoVerticalAbs).y;
							break;

						case SVGPathSeg.PATHSEG_ARC_REL:
						case SVGPathSeg.PATHSEG_CURVETO_CUBIC_REL:
						case SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL:
						case SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_REL:
						case SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL:
						case SVGPathSeg.PATHSEG_LINETO_REL:
						case SVGPathSeg.PATHSEG_MOVETO_REL:
							point.x = (pathSeg as TSVGRelativeCoordinatesTypes).x;
							point.y = (pathSeg as TSVGRelativeCoordinatesTypes).y;

						case SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_REL:
							point.x = (pathSeg as SVGPathSegLinetoHorizontalRel).x;
							break;

						case SVGPathSeg.PATHSEG_LINETO_VERTICAL_REL:
							point.y = (pathSeg as SVGPathSegLinetoVerticalRel).y;
							break;

						case SVGPathSeg.PATHSEG_UNKNOWN:
						case SVGPathSeg.PATHSEG_CLOSEPATH:
						default:
							continue;
					}

					this.polygonRaw.push([
						point.x * this.polygon.scale + this.polygonOffsetX,
						point.y * this.polygon.scale + this.polygonOffsetY
					]);
				}
			});

			this.lastCanvasWidth = this.library.canvas.width;
			this.lastCanvasHeight = this.library.canvas.height;

			this.createPath2D();

			return this.polygonRaw;
		});
	}

	private parseSvgPath(svgUrl: string): Promise<ISVGPolygonData> {
		if (
			!this.polygonData ||
			!this.polygonData.paths ||
			!this.polygonData.paths.length ||
			!this.polygonData.svg
		) {
			return this.library.imageManager.downloadImage(svgUrl).then(data => {
				return {
					// Single path supported for now
					paths: [data.xhr.responseXML.getElementsByTagName("path")[0]],
					svg: data.xhr.responseXML.getElementsByTagName("svg")[0]
				};
			});
		} else {
			return Promise.resolve(this.polygonData);
		}
	}

	getRandomPointOnPolygonPath(): TPoint {
		if (!this.initialized) throw new Error(`No polygon data loaded.`);
		const [x, y] = this.polygonRaw[
			Math.floor(Math.random() * this.polygonRaw.length)
		];
		return {
			x,
			y
		};
	}

	getRandomPointOnPolygonPathByLength(): TPoint {
		if (!this.initialized) throw new Error(`No polygon data loaded.`);
		const point = this.polygonData.paths[0].getPointAtLength(
			Math.floor(Math.random() * this.polygonPathLength) + 1
		);
		return {
			x: point.x * this.polygon.scale + this.polygonOffsetX,
			y: point.y * this.polygon.scale + this.polygonOffsetY
		};
	}

	getRandomPointInsidePolygonPath(): TPoint {
		if (!this.initialized) throw new Error(`No polygon data loaded.`);
		const point = {
			x: Math.random() * this.library.canvas.width,
			y: Math.random() * this.library.canvas.height
		};
		return this.isPointInsidePolygon(point)
			? point
			: this.getRandomPointInsidePolygonPath();
	}

	getRandomPointOutsidePolygonPath(): TPoint {
		if (!this.initialized) throw new Error(`No polygon data loaded.`);
		const point = {
			x: Math.random() * this.library.canvas.width,
			y: Math.random() * this.library.canvas.height
		};
		return this.isPointInsidePolygon(point)
			? this.getRandomPointOutsidePolygonPath()
			: point;
	}

	isPointInsidePolygon(point: TPoint): boolean {
		if (this.path2DSupported && this.polygonPath) {
			return this.library.canvas.ctx.isPointInPath(
				this.polygonPath,
				point.x,
				point.y
			);
		} else {
			let inside = false;
			// https://github.com/substack/point-in-polygon
			// ray-casting algorithm based on
			// http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
			for (
				let i = 0, j = this.polygonRaw.length - 1;
				i < this.polygonRaw.length;
				j = i++
			) {
				const xi = this.polygonRaw[i][0],
					yi = this.polygonRaw[i][1];
				const xj = this.polygonRaw[j][0],
					yj = this.polygonRaw[j][1];
				const intersect =
					yi > point.y != yj > point.y &&
					point.x < ((xj - xi) * (point.y - yi)) / (yj - yi) + xi;
				if (intersect) inside = !inside;
			}
			return inside;
		}
	}

	getPoingOnPolygonPathByIndex(index: number): TPoint {
		if (!this.initialized) throw new Error(`No polygon data loaded.`);
		const [x, y] = this.polygonRaw[index % this.polygonRaw.length];
		return { x, y };
	}

	getEquidistantPoingOnPolygonPathByIndex(index: number): TPoint {
		if (!this.initialized) throw new Error(`No polygon data loaded.`);
		const point = this.polygonData.paths[0].getPointAtLength(
			(this.polygonPathLength /
				this.library.getParameter(p => p.particles.number.value)) *
				index
		);
		return {
			x: point.x * this.polygon.scale + this.polygonOffsetX,
			y: point.y * this.polygon.scale + this.polygonOffsetY
		};
	}

	drawPolygon() {
		const context = this.library.canvas.ctx;
		if (!this.path2DSupported) {
			if (!this.initialized) return;
			context.beginPath();
			context.moveTo(this.polygonRaw[0][0], this.polygonRaw[0][1]);
			this.polygonRaw.forEach(([x, y], i) => {
				if (i > 0) context.lineTo(x, y);
			});
			context.closePath();
		}
		context.strokeStyle = this.polygon.draw.stroke.color;
		context.lineWidth = this.polygon.draw.stroke.width;
		this.polygonPath ? context.stroke(this.polygonPath) : context.stroke();
	}

	createPath2D() {
		if (!this.path2DSupported) return;
		this.polygonPath = new Path2D();
		this.polygonPath.moveTo(this.polygonRaw[0][0], this.polygonRaw[0][1]);
		this.polygonRaw.forEach(([x, y], i) => {
			if (i > 0) this.polygonPath.lineTo(x, y);
		});
		this.polygonPath.closePath();
	}
}
