import { type Container, type IShapeDrawer, errorPrefix } from "tsparticles-engine";
import type { IImage, IParticleImage, ImageParticle } from "./Utils";
import type { ImageContainer, ImageEngine } from "./types";
import type { IImageShape } from "./IImageShape";
import { replaceImageColor } from "./Utils";

/**
 * @category Shape Drawers
 */
export class ImageDrawer implements IShapeDrawer {
    private readonly _engine: ImageEngine;

    /**
     * Image drawer constructor, initializing the image set collection
     *
     * @param engine
     */
    constructor(engine: ImageEngine) {
        this._engine = engine;
    }

    /**
     * Adds an image to the given container
     *
     * @param container - the container where the image is going to be added
     * @param image - the image to add to the container collection
     */
    addImage(image: IImage): void {
        if (!this._engine.images) {
            this._engine.images = [];
        }

        this._engine.images.push(image);
    }

    /**
     * The draw image method
     *
     * @param context - the context used for drawing
     * @param particle - the particle to be drawn
     * @param radius - the particle radius
     * @param opacity - the particle opacity
     */
    draw(context: CanvasRenderingContext2D, particle: ImageParticle, radius: number, opacity: number): void {
        const image = particle.image,
            element = image?.element;

        if (!element) {
            return;
        }

        const ratio = image?.ratio ?? 1,
            pos = {
                x: -radius,
                y: -radius,
            };

        context.globalAlpha = opacity;

        context.drawImage(element, pos.x, pos.y, radius * 2, (radius * 2) / ratio);

        context.globalAlpha = 1;
    }

    /**
     * Returning the side count for the image, defaults to 12 for using the inner circle as rendering
     * When using non-transparent images this can be an issue with shadows
     */
    getSidesCount(): number {
        return 12;
    }

    async init(container: ImageContainer): Promise<void> {
        const options = container.actualOptions;

        if (!options.preload || !this._engine.loadImage) {
            return;
        }

        for (const imageData of options.preload) {
            this._engine.loadImage(imageData);
        }
    }

    loadShape(particle: ImageParticle): void {
        if (particle.shape !== "image" && particle.shape !== "images") {
            return;
        }

        if (!this._engine.images) {
            this._engine.images = [];
        }

        const imageData = particle.shapeData as IImageShape,
            image = this._engine.images.find((t: IImage) => t.name === imageData.name || t.source === imageData.src);

        if (!image) {
            this.loadImageShape(imageData).then(() => {
                this.loadShape(particle);
            });
        }
    }

    /**
     * Loads the image shape to the given particle
     *
     * @param container - the particles container
     * @param particle - the particle loading the image shape
     */
    particleInit(container: Container, particle: ImageParticle): void {
        if (particle.shape !== "image" && particle.shape !== "images") {
            return;
        }

        if (!this._engine.images) {
            this._engine.images = [];
        }

        const images = this._engine.images,
            imageData = particle.shapeData as IImageShape,
            color = particle.getFillColor(),
            image = images.find((t: IImage) => t.name === imageData.name || t.source === imageData.src);

        if (!image) {
            return;
        }

        const replaceColor = imageData.replaceColor ?? imageData.replace_color ?? image.replaceColor;

        if (image.loading) {
            setTimeout((): void => {
                this.particleInit(container, particle);
            });

            return;
        }

        (async (): Promise<void> => {
            let imageRes: IParticleImage;

            if (image.svgData && color) {
                imageRes = await replaceImageColor(image, imageData, color, particle);
            } else {
                imageRes = {
                    color,
                    data: image,
                    element: image.element,
                    loaded: true,
                    ratio: imageData.width && imageData.height ? imageData.width / imageData.height : image.ratio ?? 1,
                    replaceColor: replaceColor,
                    source: imageData.src,
                };
            }

            if (!imageRes.ratio) {
                imageRes.ratio = 1;
            }

            const fill = imageData.fill ?? particle.fill,
                close = imageData.close ?? particle.close,
                imageShape = {
                    image: imageRes,
                    fill,
                    close,
                };

            particle.image = imageShape.image;
            particle.fill = imageShape.fill;
            particle.close = imageShape.close;
        })();
    }

    /**
     * Loads the image shape
     *
     * @param imageShape - the image shape to load
     * @private
     */
    private async loadImageShape(imageShape: IImageShape): Promise<void> {
        if (!this._engine.loadImage) {
            throw new Error(`${errorPrefix} image shape not initialized`);
        }

        await this._engine.loadImage({
            name: imageShape.name,
            replaceColor: imageShape.replaceColor ?? imageShape.replace_color ?? false,
            src: imageShape.src,
        });
    }
}
