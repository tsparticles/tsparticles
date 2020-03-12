"use strict";

import {Constants} from "./Utils/Constants";
import {Container} from "./Container";
import {PolygonMaskType} from "../Enums/PolygonMaskType";
import {IDimension} from "../Interfaces/IDimension";
import {Utils} from "./Utils/Utils";

/**
 * Canvas manager
 */
export class Canvas {
    /**
     * The particles canvas
     */
    public element: HTMLCanvasElement;
    /**
     * The particles canvas context
     */
    public context: CanvasRenderingContext2D | null;
    /**
     * The particles canvas dimension
     */
    public dimension: IDimension;
    /**
     * The particles canvas container element id
     */
    public tagId: string;
    /**
     * The ratio used by the particles canvas
     */
    public pxRatio: number;

    /**
     * The parent container
     */
    private readonly container: Container;

    /**
     * Constructor of canvas manager
     * @param container the parent container
     * @param tagId the particles container element id
     */
    constructor(container: Container, tagId: string) {
        const canvasEl = document.querySelector(`#${tagId} > .${Constants.canvasClass}`) as HTMLCanvasElement;

        this.container = container;
        this.element = canvasEl;
        this.dimension = {
            height: canvasEl.offsetHeight,
            width: canvasEl.offsetWidth,
        };
        this.tagId = tagId;
        this.pxRatio = 1;
        this.context = this.element.getContext("2d");
    }

    /* ---------- tsParticles functions - canvas ------------ */
    /**
     * Initializes the canvas element
     */
    public init(): void {
        this.size();
        this.paint();
    }

    /**
     * Calculates the size of the canvas
     */
    public size(): void {
        const container = this.container;
        const options = container.options;

        this.element.width = this.dimension.width;
        this.element.height = this.dimension.height;

        if (options.interactivity.events.resize) {
            window.addEventListener("resize", () => {
                this.dimension.width = this.element.offsetWidth;
                this.dimension.height = this.element.offsetHeight;

                /* resize canvas */
                if (container.retina.isRetina) {
                    this.dimension.width *= this.pxRatio;
                    this.dimension.height *= this.pxRatio;
                }

                this.element.width = this.dimension.width;
                this.element.height = this.dimension.height;

                /* repaint canvas on anim disabled */
                if (!options.particles.move.enable) {
                    container.particles.clear();
                    container.particles.init();
                    container.particles.draw(0);
                }

                /* density particles enabled */
                container.densityAutoParticles();

                if (options.polygon.type !== PolygonMaskType.none) {
                    if (container.polygon.redrawTimeout) {
                        clearTimeout(container.polygon.redrawTimeout);
                    }

                    container.polygon.redrawTimeout = setTimeout(async () => {
                        container.polygon.raw = await container.polygon.parseSvgPathToPolygon();
                        container.particles.clear();
                        container.particles.init();
                        container.particles.draw(0);
                    }, 250);
                }
            });
        }
    }

    /**
     * Paints the canvas background
     */
    public paint(): void {
        const container = this.container;
        const options = container.options;

        if (this.context) {
            if (options.backgroundMask.enable && options.backgroundMask.cover) {
                const color = Utils.getParticleColor(options.backgroundMask.cover);

                if (color) {
                    this.paintBase(Utils.getStyleFromColor(color));
                } else {
                    this.paintBase();
                }
            } else {
                this.paintBase();
            }
        }
    }

    private paintBase(baseColor: string = "rgba(255, 255, 255, 0)"): void {
        if (this.context) {
            this.context.fillStyle = baseColor;
            this.context.fillRect(0, 0, this.dimension.width, this.dimension.height);
        }
    }

    /**
     * Clears the canvas content
     */
    public clear(): void {
        const container = this.container;
        const options = container.options;

        if (options.backgroundMask.enable) {
            this.paint();
        } else {
            if (this.context) {
                this.context.clearRect(0, 0, this.dimension.width, this.dimension.height);
            }
        }
    }
}
