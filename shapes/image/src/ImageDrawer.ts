import type { Container, IParticle, IShapeDrawer, Particle } from "tsparticles-engine";
import type { IImageShape } from "tsparticles-engine/Options/Interfaces/Particles/Shape/IImageShape";
import {
    ContainerImage,
    downloadSvgImage,
    IImage,
    IImageParticle,
    IParticleImage,
    loadImage,
    replaceColorSvg
} from "./Utils";
import type { Shape } from "tsparticles-engine/Options/Classes/Particles/Shape/Shape";

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
                images: []
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

    init(container: Container): Promise<void> {
        const options = container.actualOptions;
        const shapeOptions = options.particles.shape;

        return this.initShape(container, shapeOptions);
    }

    destroy(): void {
        this.#images = [];
    }

    private async initShape(container: Container, shapeOptions: Shape): Promise<void> {
        /*if (!isInArray("image", shapeOptions.type) && !isInArray("images", shapeOptions.type)) {
            return;
        }*/

        const imageOptions = shapeOptions.options["image"] ?? shapeOptions.options["images"];

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

    private async loadImageShape(container: Container, imageShape: IImageShape): Promise<void> {
        try {
            const imageFunc = imageShape.replaceColor ? downloadSvgImage : loadImage;
            const image = await imageFunc(imageShape.src);

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

        const image = (particle as IImageParticle).image;
        const element = image?.data?.element;

        if (!element) {
            return;
        }

        const ratio = image?.ratio ?? 1;

        const pos = {
            x: -radius,
            y: -radius
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
            const svg = new Blob([ svgColoredData ], { type: "image/svg+xml" });
            const domUrl = URL || window.URL || window.webkitURL || window;
            const url = domUrl.createObjectURL(svg);

            /* create particle img obj */
            const img = new Image();

            imageRes = {
                data: {
                    ...image,
                    svgData: svgColoredData
                },
                ratio: imageData.width / imageData.height,
                replaceColor: imageData.replaceColor ?? imageData.replace_color,
                source: imageData.src
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
                loadImage(imageData.src).then((img2) => {
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
                source: imageData.src
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
            close
        };

        ((particle as unknown) as IImageParticle).image = imageShape.image;
        particle.fill = imageShape.fill;
        particle.close = imageShape.close;
    }
}
