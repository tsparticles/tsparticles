import type { IShapeDrawer } from "../Core/Interfaces/IShapeDrawer";
import type { IParticle } from "../Core/Interfaces/IParticle";
import { replaceColorSvg, Utils } from "../Utils";
import { ShapeType } from "../Enums";
import type { IImageShape } from "../Options/Interfaces/Particles/Shape/IImageShape";
import type { IImage } from "../Core/Interfaces/IImage";
import type { Container } from "../Core/Container";
import type { Particle } from "../Core/Particle";

interface IParticleImage {
    source: string;
    data: IImage;
    ratio: number;
    element?: HTMLImageElement;
    loaded?: boolean;
    replaceColor: boolean;
}

interface ContainerImage {
    id: string;
    images: IImage[];
}

type IImageParticle = IParticle & {
    image: IParticleImage;
};

/**
 * @category Shape Drawers
 */
export class ImageDrawer implements IShapeDrawer {
    public images: ContainerImage[];

    constructor() {
        this.images = [];
    }

    public getSidesCount(): number {
        return 12;
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
            const promises: Promise<void>[] = [];

            for (const optionsImage of imageOptions) {
                promises.push(this.loadImageShape(container, optionsImage as IImageShape));
            }

            await Promise.allSettled(promises);
        } else {
            await this.loadImageShape(container, imageOptions as IImageShape);
        }
    }

    public destroy(): void {
        this.images = [];
    }

    private async loadImageShape(container: Container, imageShape: IImageShape): Promise<void> {
        try {
            const imagePromise = imageShape.replaceColor
                ? Utils.downloadSvgImage(imageShape.src)
                : Utils.loadImage(imageShape.src);

            const image = await imagePromise;

            if (image) {
                this.addImage(container, image);
            }
        } catch {
            console.warn(`tsParticles error - ${imageShape.src} not found`);
        }
    }

    public draw(context: CanvasRenderingContext2D, particle: IParticle, radius: number, opacity: number): void {
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

    public loadShape(particle: Particle): void {
        if (!(particle.shape === ShapeType.image || particle.shape === ShapeType.images)) {
            return;
        }

        const container = particle.container;
        const images = this.getImages(container).images;
        const imageData = particle.shapeData as IImageShape;
        const image = images.find((t) => t.source === imageData.src) ?? images[0];
        const color = particle.getFillColor();
        let imageRes: IParticleImage;

        if (!image) {
            return;
        }

        if (image.svgData !== undefined && imageData.replaceColor && color) {
            const svgColoredData = replaceColorSvg(image, color, particle.opacity.value);

            /* prepare to create img with colored svg */
            const svg = new Blob([svgColoredData], { type: "image/svg+xml" });
            const domUrl = URL || window.URL || window.webkitURL || window;
            const url = domUrl.createObjectURL(svg);

            /* create particle img obj */
            const img = new Image();

            imageRes = {
                data: image,
                ratio: imageData.width / imageData.height,
                replaceColor: imageData.replaceColor ?? imageData.replace_color,
                source: imageData.src,
            };

            img.addEventListener("load", () => {
                const pImage = ((particle as unknown) as IImageParticle).image;
                if (pImage) {
                    pImage.loaded = true;
                    image.element = img;
                }

                domUrl.revokeObjectURL(url);
            });

            img.addEventListener("error", () => {
                domUrl.revokeObjectURL(url);

                // deepcode ignore PromiseNotCaughtGeneral: catch can be ignored
                Utils.loadImage(imageData.src).then((img2) => {
                    const pImage = ((particle as unknown) as IImageParticle).image;

                    if (pImage) {
                        image.element = img2?.element;

                        pImage.loaded = true;
                    }
                });
            });

            img.src = url;
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

        ((particle as unknown) as IImageParticle).image = imageShape.image;
        particle.fill = imageShape.fill;
        particle.close = imageShape.close;
    }
}
