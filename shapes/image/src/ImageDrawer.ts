import type { Container, IShapeDrawer } from "tsparticles-engine";
import type { ContainerImage, IImage, IParticleImage, ImageParticle } from "./Utils";
import { downloadSvgImage, loadImage, replaceImageColor } from "./Utils";
import type { IImageShape } from "./IImageShape";

/**
 * @category Shape Drawers
 */
export class ImageDrawer implements IShapeDrawer {
    /**
     * The image set collection
     * @private
     */
    private _images: ContainerImage[];

    /**
     * Image drawer constructor, initializing the image set collection
     */
    constructor() {
        this._images = [];
    }

    /**
     * Adds an image to the given container
     * @param container the container where the image is going to be added
     * @param image the image to add to the container collection
     */
    addImage(container: Container, image: IImage): void {
        const containerImages = this.getImages(container);

        containerImages?.images.push(image);
    }

    /**
     * Resets the image general collection
     */
    destroy(): void {
        this._images = [];
    }

    /**
     * The draw image method
     * @param context the context used for drawing
     * @param particle the particle to be drawn
     * @param radius the particle radius
     * @param opacity the particle opacity
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
     * Gets the image collection of the given container
     * @param container the container requesting the image collection
     * @returns the container image collection
     */
    getImages(container: Container): ContainerImage {
        const containerImages = this._images.find((t) => t.id === container.id);

        if (!containerImages) {
            this._images.push({
                id: container.id,
                images: [],
            });

            return this.getImages(container);
        } else {
            return containerImages;
        }
    }

    /**
     * Returning the side count for the image, defaults to 12 for using the inner circle as rendering
     * When using non-transparent images this can be an issue with shadows
     */
    getSidesCount(): number {
        return 12;
    }

    loadShape(particle: ImageParticle): void {
        if (particle.shape !== "image" && particle.shape !== "images") {
            return;
        }

        const container = particle.container,
            images = this.getImages(container).images,
            imageData = particle.shapeData as IImageShape,
            image = images.find((t) => t.source === imageData.src);

        if (!image) {
            this.loadImageShape(container, imageData).then(() => {
                this.loadShape(particle);
            });
        }
    }

    /**
     * Loads the image shape to the given particle
     * @param container the particles container
     * @param particle the particle loading the image shape
     */
    particleInit(container: Container, particle: ImageParticle): void {
        if (particle.shape !== "image" && particle.shape !== "images") {
            return;
        }

        const images = this.getImages(container).images,
            imageData = particle.shapeData as IImageShape,
            color = particle.getFillColor(),
            replaceColor = imageData.replaceColor ?? imageData.replace_color,
            image = images.find((t) => t.source === imageData.src);

        if (!image) {
            return;
        }

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
                    ratio: imageData.width / imageData.height,
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
     * @param container the container used for searching images
     * @param imageShape the image shape to load
     * @private
     */
    private async loadImageShape(container: Container, imageShape: IImageShape): Promise<void> {
        const source = imageShape.src;

        if (!source) {
            throw new Error("Error tsParticles - No image.src");
        }

        try {
            const image: IImage = {
                source: source,
                type: source.substring(source.length - 3),
                error: false,
                loading: true,
            };

            this.addImage(container, image);

            const imageFunc = imageShape.replaceColor ?? imageShape.replace_color ? downloadSvgImage : loadImage;

            await imageFunc(image);
        } catch {
            throw new Error(`tsParticles error - ${imageShape.src} not found`);
        }
    }
}
