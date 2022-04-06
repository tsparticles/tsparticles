import type { Container, IShapeDrawer, Particle } from "tsparticles-engine";
import { IImage, IImageParticle, IParticleImage, downloadSvgImage, loadImage, replaceImageColor } from "./Utils";
import { IImageShape } from "./IImageShape";

interface ContainerImage {
    id: string;
    images: IImage[];
}

/**
 * @category Shape Drawers
 */
export class ImageDrawer implements IShapeDrawer {
    /**
     * The image set collection
     * @private
     */
    #images: ContainerImage[];

    /**
     * Image drawer constructor, initializing the image set collection
     */
    constructor() {
        this.#images = [];
    }

    /**
     * Returning the side count for the image, defaults to 12 for using the inner circle as rendering
     * When using non-transparent images this can be an issue with shadows
     */
    getSidesCount(): number {
        return 12;
    }

    /**
     * Gets the image collection of the given container
     * @param container the container requesting the image collection
     * @returns the container image collection
     */
    getImages(container: Container): ContainerImage {
        const containerImages = this.#images.find((t) => t.id === container.id);

        if (!containerImages) {
            this.#images.push({
                id: container.id,
                images: [],
            });

            return this.getImages(container);
        } else {
            return containerImages;
        }
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
        this.#images = [];
    }

    /**
     * The draw image method
     * @param context the context used for drawing
     * @param particle the particle to be drawn
     * @param radius the particle radius
     * @param opacity the particle opacity
     */
    draw(context: CanvasRenderingContext2D, particle: IImageParticle, radius: number, opacity: number): void {
        const image = particle.image;
        const element = image?.data?.element;

        if (!element) {
            return;
        }

        const ratio = image?.ratio ?? 1;

        const pos = {
            x: -radius,
            y: -radius,
        };

        if (!image?.data.svgData || !image?.replaceColor) {
            context.globalAlpha = opacity;
        }

        context.drawImage(element, pos.x, pos.y, radius * 2, (radius * 2) / ratio);

        if (!image?.data.svgData || !image?.replaceColor) {
            context.globalAlpha = 1;
        }
    }

    /**
     * Loads the image shape to the given particle
     * @param particle the particle loading the image shape
     */
    loadShape(particle: Particle): void {
        if (particle.shape !== "image" && particle.shape !== "images") {
            return;
        }

        const images = this.getImages(particle.container).images;
        const imageData = particle.shapeData as IImageShape;
        const image = images.find((t) => t.source === imageData.src);
        let imageRes: IParticleImage;

        if (!image) {
            this.loadImageShape(particle.container, imageData).then(() => {
                this.loadShape(particle);
            });

            return;
        }

        if (image.error) {
            return;
        }

        const color = particle.getFillColor();

        if (image.svgData && imageData.replaceColor && color) {
            imageRes = replaceImageColor(image, imageData, color, particle);
        } else {
            imageRes = {
                data: image,
                loaded: true,
                ratio: imageData.width / imageData.height,
                replaceColor: imageData.replaceColor ?? imageData.replace_color,
                source: imageData.src,
            };
        }

        if (!imageRes.ratio) {
            imageRes.ratio = 1;
        }

        const fill = imageData.fill ?? particle.fill;
        const close = imageData.close ?? particle.close;

        const imageShape = {
            image: imageRes,
            fill,
            close,
        };

        (particle as IImageParticle).image = imageShape.image;

        particle.fill = imageShape.fill;
        particle.close = imageShape.close;
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
                type: source.substr(source.length - 3),
                error: false,
                loading: true,
            };

            this.addImage(container, image);

            const imageFunc = imageShape.replaceColor ? downloadSvgImage : loadImage;
            await imageFunc(image);
        } catch {
            throw new Error(`tsParticles error - ${imageShape.src} not found`);
        }
    }
}
