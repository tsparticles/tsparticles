import type { IShapeDrawer } from "../../Interfaces/IShapeDrawer";
import type { IParticle } from "../../Interfaces/IParticle";
import { Utils } from "../../../Utils/Utils";
import { ShapeType } from "../../../Enums/ShapeType";
import type { IImageShape } from "../../../Options/Interfaces/Particles/Shape/IImageShape";
import type { IImage } from "../../Interfaces/IImage";
import type { Container } from "../../Container";

interface IContainerImage {
    id: string;
    images: IImage[];
}

export class ImageDrawer implements IShapeDrawer {
    public images: IContainerImage[];

    constructor() {
        this.images = [];
    }

    public getImages(container: Container): IContainerImage {
        const containerImages = this.images.filter((t) => t.id == container.id);

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
        const imageOptions = options.particles.shape.options[ShapeType.images] ??
            options.particles.shape.options[ShapeType.image];

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
            const image = await Utils.loadImage(imageShape.src);

            this.addImage(container, image);
        } catch {
            console.log(`tsParticles error - ${imageShape.src} not found`);
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

        context.globalAlpha = opacity;
        context.drawImage(element, pos.x, pos.y, radius * 2, radius * 2 / ratio);
        context.globalAlpha = 1;
    }
}
