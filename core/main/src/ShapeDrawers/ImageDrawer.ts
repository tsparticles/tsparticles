import type { IShapeDrawer } from "../Core/Interfaces/IShapeDrawer";
import type { IParticle } from "../Core/Interfaces/IParticle";
import { Utils } from "../Utils";
import { ShapeType } from "../Enums";
import type { IImageShape } from "../Options/Interfaces/Particles/Shape/IImageShape";
import type { IImage } from "../Core/Interfaces/IImage";
import type { Container } from "../Core/Container";

interface ContainerImage {
    id: string;
    images: IImage[];
}

export class ImageDrawer implements IShapeDrawer {
    public images: ContainerImage[];

    constructor() {
        this.images = [];
    }

    public getImages(container: Container): ContainerImage {
        const containerImages = this.images.filter((t) => t.id === container.id);

        if (!containerImages.length) {
            this.images.push({
                id: container.id,
                images: [],
            });

            return this.getImages(container);
        } else {
            return containerImages[0];
        }
    }

    public addImage(container: Container, image: IImage): void {
        const containerImages = this.getImages(container);

        containerImages?.images.push(image);
    }

    public async init(container: Container): Promise<void> {
        const options = container.options;
        const shapeOptions = options.particles.shape;

        if (
            !Utils.isInArray(ShapeType.image, shapeOptions.type) &&
            !Utils.isInArray(ShapeType.images, shapeOptions.type)
        ) {
            return;
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

    public destroy(): void {
        this.images = [];
    }

    private async loadImageShape(container: Container, imageShape: IImageShape): Promise<void> {
        try {
            const image = imageShape.replaceColor
                ? await Utils.downloadSvgImage(imageShape.src)
                : await Utils.loadImage(imageShape.src);

            this.addImage(container, image);
        } catch {
            console.warn(`tsParticles error - ${imageShape.src} not found`);
        }
    }

    public draw(context: CanvasRenderingContext2D, particle: IParticle, radius: number, opacity: number): void {
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
