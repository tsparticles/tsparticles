import type { IShapeDrawer } from "../Core/Interfaces/IShapeDrawer";
import type { IParticle } from "../Core/Interfaces/IParticle";
import { downloadSvgImage, isInArray, loadImage } from "../Utils";
import { ShapeType } from "../Enums";
import type { IImageShape } from "../Options/Interfaces/Particles/Shape/IImageShape";
import type { IImage } from "../Core/Interfaces/IImage";
import type { Container } from "../Core/Container";

interface ContainerImage {
    id: string;
    images: IImage[];
}

/**
 * @category Shape Drawers
 */
export class ImageDrawer implements IShapeDrawer {
    images: ContainerImage[];

    constructor() {
        this.images = [];
    }

    getSidesCount(): number {
        return 12;
    }

    getImages(container: Container): ContainerImage {
        const containerImages = this.images.filter((t) => t.id === container.id);

        if (!containerImages.length) {
            this.images.push({
                id: container.id,
                images: [],
            });

            return this.getImages(container);
        }

        return containerImages[0];
    }

    addImage(container: Container, image: IImage): void {
        const containerImages = this.getImages(container);

        containerImages?.images.push(image);
    }

    async init(container: Container): Promise<void> {
        const options = container.actualOptions;
        const shapeOptions = options.particles.shape;

        if (!isInArray(ShapeType.image, shapeOptions.type) && !isInArray(ShapeType.images, shapeOptions.type)) {
            return;
        }

        const idx = this.images.findIndex((t) => t.id === container.id);

        if (idx >= 0) {
            this.images.splice(idx, 1);
        }

        const imageOptions = shapeOptions.options[ShapeType.images] ?? shapeOptions.options[ShapeType.image];

        if (imageOptions instanceof Array) {
            for (const optionsImage of imageOptions) {
                await this.loadImageShape(container, optionsImage as IImageShape);
            }
        } else {
            await this.loadImageShape(container, imageOptions as IImageShape);
        }
    }

    destroy(): void {
        this.images = [];
    }

    private async loadImageShape(container: Container, imageShape: IImageShape): Promise<void> {
        try {
            const image = imageShape.replaceColor
                ? await downloadSvgImage(imageShape.src)
                : await loadImage(imageShape.src);

            if (image) {
                this.addImage(container, image);
            }
        } catch {
            console.warn(`tsParticles error - ${imageShape.src} not found`);
        }
    }

    draw(context: CanvasRenderingContext2D, particle: IParticle, radius: number, opacity: number): void {
        if (!context) {
            return;
        }

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
}
