import type { IParticle, IShapeDrawer } from "../../Core/Interfaces";
import type { IImageShape } from "../../Options/Interfaces/Particles/Shape/IImageShape";
import type { Container } from "../../Core/Container";
import type { IImage, IImageParticle, IParticleImage } from "./Utils";
import { downloadSvgImage, loadImage, replaceImageColor } from "./Utils";
import type { Particle } from "../../Core/Particle";

interface ContainerImage {
    id: string;
    images: IImage[];
}

/**
 * @category Shape Drawers
 */
export class ImageDrawer implements IShapeDrawer {
    #images: ContainerImage[];

    constructor() {
        this.#images = [];
    }

    getSidesCount(): number {
        return 12;
    }

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

    addImage(container: Container, image: IImage): void {
        const containerImages = this.getImages(container);

        containerImages?.images.push(image);
    }

    destroy(): void {
        this.#images = [];
    }

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

    draw(context: CanvasRenderingContext2D, particle: IParticle, radius: number, opacity: number): void {
        if (!context) {
            return;
        }

        const image = (particle as IImageParticle).image;
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
}
