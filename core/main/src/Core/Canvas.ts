import type { Container } from "./Container";
import type { ILink } from "./Interfaces/ILink";
import {
    colorToHsl,
    colorToRgb,
    Constants,
    deepExtend,
    drawConnectLine,
    drawGrabLine,
    drawLight,
    drawLinkLine,
    drawLinkTriangle,
    drawParticle,
    drawParticleShadow,
    drawPlugin,
    getDistance,
    getLinkColor,
    getStyleFromHsl,
    getStyleFromRgb,
    gradient,
    paintBase,
} from "../Utils";
import type { Particle } from "./Particle";
import { clear } from "../Utils";
import type { IContainerPlugin, ICoordinates, IDelta, IDimension, IHsl, IParticle, IRgb, IRgba } from "./Interfaces";

/**
 * Canvas manager
 * @category Core
 */
export class Canvas {
    /**
     * The particles canvas
     */
    element?: HTMLCanvasElement;

    /**
     * The particles canvas dimension
     */
    readonly size: IDimension;

    resizeFactor?: IDimension;

    /**
     * The particles canvas context
     */
    private context: CanvasRenderingContext2D | null;
    private generatedCanvas;
    private coverColor?: IRgba;
    private trailFillColor?: IRgba;
    private originalStyle?: CSSStyleDeclaration;

    /**
     * Constructor of canvas manager
     * @param container the parent container
     */
    constructor(private readonly container: Container) {
        this.size = {
            height: 0,
            width: 0,
        };

        this.context = null;
        this.generatedCanvas = false;
    }

    /* ---------- tsParticles functions - canvas ------------ */
    /**
     * Initializes the canvas element
     */
    init(): void {
        this.resize();
        this.initStyle();
        this.initCover();
        this.initTrail();
        this.initBackground();
        this.paint();
    }

    loadCanvas(canvas: HTMLCanvasElement, generatedCanvas?: boolean): void {
        if (!canvas.className) {
            canvas.className = Constants.canvasClass;
        }

        if (this.generatedCanvas) {
            this.element?.remove();
        }

        this.generatedCanvas = generatedCanvas ?? this.generatedCanvas;
        this.element = canvas;
        this.originalStyle = deepExtend({}, this.element.style) as CSSStyleDeclaration;
        this.size.height = canvas.offsetHeight;
        this.size.width = canvas.offsetWidth;

        this.context = this.element.getContext("2d");
        this.container.retina.init();
        this.initBackground();
    }

    destroy(): void {
        if (this.generatedCanvas) {
            this.element?.remove();
        }

        this.safePaint((ctx) => {
            clear(ctx, this.size);
        });
    }

    /**
     * Paints the canvas background
     */
    paint(): void {
        const options = this.container.actualOptions;

        this.safePaint((ctx) => {
            if (options.backgroundMask.enable && options.backgroundMask.cover && this.coverColor) {
                clear(ctx, this.size);

                this.paintBase(getStyleFromRgb(this.coverColor, this.coverColor.a));
            } else {
                this.paintBase();
            }
        });
    }

    /**
     * Clears the canvas content
     */
    clear(): void {
        const options = this.container.actualOptions;
        const trail = options.particles.move.trail;

        if (options.backgroundMask.enable) {
            this.paint();
        } else if (trail.enable && trail.length > 0 && this.trailFillColor) {
            this.paintBase(getStyleFromRgb(this.trailFillColor, 1 / trail.length));
        } else {
            this.safePaint((ctx) => {
                clear(ctx, this.size);
            });
        }
    }

    windowResize(): void {
        if (!this.element) {
            return;
        }

        const container = this.container;

        this.resize();

        container.actualOptions.setResponsive(this.size.width, container.retina.pixelRatio, container.options);

        /* density particles enabled */
        container.particles.setDensity();

        for (const [, plugin] of container.plugins) {
            if (plugin.resize !== undefined) {
                plugin.resize();
            }
        }
    }

    /**
     * Calculates the size of the canvas
     */
    resize(): void {
        if (!this.element) {
            return;
        }

        const container = this.container;
        const pxRatio = container.retina.pixelRatio;
        const size = container.canvas.size;
        const oldSize = {
            width: size.width,
            height: size.height,
        };

        size.width = this.element.offsetWidth * pxRatio;
        size.height = this.element.offsetHeight * pxRatio;

        this.element.width = size.width;
        this.element.height = size.height;

        if (this.container.started) {
            this.resizeFactor = {
                width: size.width / oldSize.width,
                height: size.height / oldSize.height,
            };
        }
    }

    drawConnectLine(p1: IParticle, p2: IParticle): void {
        this.safePaint((ctx) => {
            const lineStyle = this.lineStyle(p1, p2);

            if (!lineStyle) {
                return;
            }

            const pos1 = p1.getPosition();
            const pos2 = p2.getPosition();

            drawConnectLine(ctx, p1.linksWidth ?? this.container.retina.linksWidth, lineStyle, pos1, pos2);
        });
    }

    drawGrabLine(particle: IParticle, lineColor: IRgb, opacity: number, mousePos: ICoordinates): void {
        const container = this.container;

        this.safePaint((ctx) => {
            const beginPos = particle.getPosition();

            drawGrabLine(
                ctx,
                particle.linksWidth ?? container.retina.linksWidth,
                beginPos,
                mousePos,
                lineColor,
                opacity
            );
        });
    }

    drawParticleShadow(particle: Particle, mousePos: ICoordinates): void {
        this.safePaint((ctx) => {
            drawParticleShadow(this.container, ctx, particle, mousePos);
        });
    }

    drawLinkTriangle(p1: IParticle, link1: ILink, link2: ILink): void {
        const container = this.container;
        const options = container.actualOptions;
        const p2 = link1.destination;
        const p3 = link2.destination;
        const triangleOptions = p1.options.links.triangles;
        const opacityTriangle = triangleOptions.opacity ?? (link1.opacity + link2.opacity) / 2;

        if (opacityTriangle <= 0) {
            return;
        }

        this.safePaint((ctx) => {
            const pos1 = p1.getPosition();
            const pos2 = p2.getPosition();
            const pos3 = p3.getPosition();

            if (
                getDistance(pos1, pos2) > container.retina.linksDistance ||
                getDistance(pos3, pos2) > container.retina.linksDistance ||
                getDistance(pos3, pos1) > container.retina.linksDistance
            ) {
                return;
            }

            let colorTriangle = colorToRgb(triangleOptions.color);

            if (!colorTriangle) {
                const linksOptions = p1.options.links;
                const linkColor =
                    linksOptions.id !== undefined
                        ? container.particles.linksColors.get(linksOptions.id)
                        : container.particles.linksColor;

                colorTriangle = getLinkColor(p1, p2, linkColor);

                if (!colorTriangle) {
                    return;
                }
            }

            drawLinkTriangle(
                ctx,
                pos1,
                pos2,
                pos3,
                options.backgroundMask.enable,
                options.backgroundMask.composite,
                colorTriangle,
                opacityTriangle
            );
        });
    }

    drawLinkLine(p1: IParticle, link: ILink): void {
        const container = this.container;
        const options = container.actualOptions;
        const p2 = link.destination;
        let opacity = link.opacity;
        const pos1 = p1.getPosition();
        const pos2 = p2.getPosition();

        this.safePaint((ctx) => {
            let colorLine: IRgb | undefined;

            /*
             * particles connecting line color:
             *
             *  random: in blink mode : in every frame refresh the color would change
             *          hence resulting blinking of lines
             *  mid: in consent mode: sample particles color and get a mid level color
             *                        from those two for the connecting line color
             */

            const twinkle = p1.options.twinkle.lines;

            if (twinkle.enable) {
                const twinkleFreq = twinkle.frequency;
                const twinkleRgb = colorToRgb(twinkle.color);
                const twinkling = Math.random() < twinkleFreq;

                if (twinkling && twinkleRgb !== undefined) {
                    colorLine = twinkleRgb;
                    opacity = twinkle.opacity;
                }
            }

            if (!colorLine) {
                const linksOptions = p1.options.links;
                const linkColor =
                    linksOptions.id !== undefined
                        ? container.particles.linksColors.get(linksOptions.id)
                        : container.particles.linksColor;

                colorLine = getLinkColor(p1, p2, linkColor);
            }

            if (!colorLine) {
                return;
            }

            const width = p1.linksWidth ?? container.retina.linksWidth;
            const maxDistance = p1.linksDistance ?? container.retina.linksDistance;

            drawLinkLine(
                ctx,
                width,
                pos1,
                pos2,
                maxDistance,
                container.canvas.size,
                p1.options.links.warp,
                options.backgroundMask.enable,
                options.backgroundMask.composite,
                colorLine,
                opacity,
                p1.options.links.shadow
            );
        });
    }

    drawParticle(particle: Particle, delta: IDelta): void {
        if (particle.image?.loaded === false || particle.spawning || particle.destroyed) {
            return;
        }

        const pfColor = particle.getFillColor();
        const psColor = particle.getStrokeColor() ?? pfColor;

        if (!pfColor && !psColor) {
            return;
        }

        let [fColor, sColor] = this.getPluginParticleColors(particle);

        const pOptions = particle.options;
        const twinkle = pOptions.twinkle.particles;
        const twinkling = twinkle.enable && Math.random() < twinkle.frequency;

        if (!fColor || !sColor) {
            const twinkleRgb = colorToHsl(twinkle.color);

            if (!fColor) {
                fColor = twinkling && twinkleRgb !== undefined ? twinkleRgb : pfColor ? pfColor : undefined;
            }

            if (!sColor) {
                sColor = twinkling && twinkleRgb !== undefined ? twinkleRgb : psColor ? psColor : undefined;
            }
        }

        const options = this.container.actualOptions;
        const radius = particle.getRadius();
        const opacity = twinkling ? twinkle.opacity : particle.bubble.opacity ?? particle.opacity.value;

        const fillColorValue = fColor ? getStyleFromHsl(fColor, opacity) : undefined;

        if (!fillColorValue && !sColor) {
            return;
        }

        this.safePaint((ctx) => {
            const strokeColorValue = sColor
                ? getStyleFromHsl(sColor, particle.stroke.opacity ?? opacity)
                : fillColorValue;

            this.drawParticleLinks(particle);

            if (radius > 0) {
                drawParticle(
                    this.container,
                    ctx,
                    particle,
                    delta,
                    fillColorValue,
                    strokeColorValue,
                    options.backgroundMask.enable,
                    options.backgroundMask.composite,
                    radius,
                    opacity,
                    particle.options.shadow
                );
            }
        });
    }

    drawParticleLinks(particle: Particle): void {
        this.safePaint((ctx) => {
            const container = this.container;
            const particles = container.particles;
            const pOptions = particle.options;

            if (particle.links.length > 0) {
                ctx.save();
                const p1Links = particle.links.filter((l) => {
                    const linkFreq = container.particles.getLinkFrequency(particle, l.destination);

                    return linkFreq <= pOptions.links.frequency;
                });

                for (const link of p1Links) {
                    const p2 = link.destination;

                    if (pOptions.links.triangles.enable) {
                        const links = p1Links.map((l) => l.destination);
                        const vertices = p2.links.filter((t) => {
                            const linkFreq = container.particles.getLinkFrequency(p2, t.destination);

                            return linkFreq <= p2.options.links.frequency && links.indexOf(t.destination) >= 0;
                        });

                        if (vertices.length) {
                            for (const vertex of vertices) {
                                const p3 = vertex.destination;
                                const triangleFreq = particles.getTriangleFrequency(particle, p2, p3);

                                if (triangleFreq > pOptions.links.triangles.frequency) {
                                    continue;
                                }

                                this.drawLinkTriangle(particle, link, vertex);
                            }
                        }
                    }

                    if (link.opacity > 0 && container.retina.linksWidth > 0) {
                        this.drawLinkLine(particle, link);
                    }
                }

                ctx.restore();
            }
        });
    }

    drawPlugin(plugin: IContainerPlugin, delta: IDelta): void {
        this.safePaint((ctx) => {
            drawPlugin(ctx, plugin, delta);
        });
    }

    drawLight(mousePos: ICoordinates): void {
        this.safePaint((ctx) => {
            drawLight(this.container, ctx, mousePos);
        });
    }

    initBackground(): void {
        const options = this.container.actualOptions;
        const background = options.background;
        const element = this.element;
        const elementStyle = element?.style;

        if (!elementStyle) {
            return;
        }

        if (background.color) {
            const color = colorToRgb(background.color);

            elementStyle.backgroundColor = color ? getStyleFromRgb(color, background.opacity) : "";
        } else {
            elementStyle.backgroundColor = "";
        }

        elementStyle.backgroundImage = background.image || "";
        elementStyle.backgroundPosition = background.position || "";
        elementStyle.backgroundRepeat = background.repeat || "";
        elementStyle.backgroundSize = background.size || "";
    }

    private initCover(): void {
        const options = this.container.actualOptions;
        const cover = options.backgroundMask.cover;
        const color = cover.color;
        const coverRgb = colorToRgb(color);

        if (coverRgb) {
            this.coverColor = {
                r: coverRgb.r,
                g: coverRgb.g,
                b: coverRgb.b,
                a: cover.opacity,
            };
        }
    }

    private initTrail(): void {
        const options = this.container.actualOptions;
        const trail = options.particles.move.trail;
        const fillColor = colorToRgb(trail.fillColor);

        if (fillColor) {
            const trail = options.particles.move.trail;

            this.trailFillColor = {
                r: fillColor.r,
                g: fillColor.g,
                b: fillColor.b,
                a: 1 / trail.length,
            };
        }
    }

    private getPluginParticleColors(particle: Particle): (IHsl | undefined)[] {
        let fColor: IHsl | undefined;
        let sColor: IHsl | undefined;

        for (const [, plugin] of this.container.plugins) {
            if (!fColor && plugin.particleFillColor) {
                fColor = colorToHsl(plugin.particleFillColor(particle));
            }

            if (!sColor && plugin.particleStrokeColor) {
                sColor = colorToHsl(plugin.particleStrokeColor(particle));
            }

            if (fColor && sColor) {
                break;
            }
        }

        return [fColor, sColor];
    }

    private initStyle(): void {
        const element = this.element,
            options = this.container.actualOptions;

        if (!element) {
            return;
        }

        const originalStyle = this.originalStyle;

        if (options.fullScreen.enable) {
            this.originalStyle = deepExtend({}, element.style) as CSSStyleDeclaration;

            element.style.position = "fixed";
            element.style.zIndex = options.fullScreen.zIndex.toString(10);
            element.style.top = "0";
            element.style.left = "0";
            element.style.width = "100%";
            element.style.height = "100%";
        } else if (originalStyle) {
            element.style.position = originalStyle.position;
            element.style.zIndex = originalStyle.zIndex;
            element.style.top = originalStyle.top;
            element.style.left = originalStyle.left;
            element.style.width = originalStyle.width;
            element.style.height = originalStyle.height;
        }
    }

    private paintBase(baseColor?: string): void {
        this.safePaint((ctx) => {
            paintBase(ctx, this.size, baseColor);
        });
    }

    private lineStyle(p1: IParticle, p2: IParticle): CanvasGradient | undefined {
        return this.safePaint((ctx) => {
            const options = this.container.actualOptions;
            const connectOptions = options.interactivity.modes.connect;

            return gradient(ctx, p1, p2, connectOptions.links.opacity);
        });
    }

    private safePaint<T>(cb: (context: CanvasRenderingContext2D) => T) {
        if (!this.context) {
            return;
        }

        return cb(this.context);
    }
}
