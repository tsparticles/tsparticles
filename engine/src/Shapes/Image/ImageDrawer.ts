import type { IParticle, IShapeDrawer } from "../../Core/Interfaces";
import { isInArray } from "../../Utils";
import { ShapeType } from "../../Enums";
import type { IImageShape } from "../../Options/Interfaces/Particles/Shape/IImageShape";
import type { Container } from "../../Core/Container";
import type { IEmitterOptions } from "../../Plugins/Emitters/Options/Interfaces/IEmitterOptions";
import type { IParticles } from "../../Options/Interfaces/Particles/IParticles";
import type { RecursivePartial } from "../../Types";
import type { IImage, IImageParticle, IParticleImage } from "./Utils";
import { downloadSvgImage, loadImage, replaceColorSvg } from "./Utils";
import { Particle } from "../../Core/Particle";

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

    async init(container: Container): Promise<void> {
        return;

        const promises: Promise<void>[] = [];

        promises.push(this.loadImagesFromParticlesOptions(container, container.actualOptions.particles));

        promises.push(
            this.loadImagesFromParticlesOptions(container, container.actualOptions.interactivity.modes.trail.particles)
        );

        for (const manualParticle of container.actualOptions.manualParticles) {
            promises.push(this.loadImagesFromParticlesOptions(container, manualParticle.options));
        }

        await Promise.all(promises);
    }

    destroy(): void {
        this.#images = [];
    }

    private async loadImagesFromParticlesOptions(container: Container, options?: RecursivePartial<IParticles>) {
        const shapeOptions = options?.shape;

        if (
            !shapeOptions?.type ||
            !shapeOptions.options ||
            (!isInArray(ShapeType.image, shapeOptions.type) && !isInArray(ShapeType.images, shapeOptions.type))
        ) {
            return;
        }

        const idx = this.#images.findIndex((t) => t.id === container.id);

        if (idx >= 0) {
            this.#images.splice(idx, 1);
        }

        const imageOptions = shapeOptions.options[ShapeType.images] ?? shapeOptions.options[ShapeType.image];
        const promises: Promise<void>[] = [];

        if (imageOptions instanceof Array) {
            for (const optionsImage of imageOptions) {
                promises.push(this.loadImageShape(container, optionsImage as IImageShape));
            }
        } else {
            promises.push(this.loadImageShape(container, imageOptions as IImageShape));
        }

        if (options?.groups) {
            for (const groupName in options.groups) {
                const group = options.groups[groupName];

                promises.push(this.loadImagesFromParticlesOptions(container, group));
            }
        }

        if (options?.destroy?.split?.particles) {
            promises.push(
                this.loadImagesFromParticlesOptions(
                    container,
                    options?.destroy.split.particles as RecursivePartial<IParticles>
                )
            );
        }

        await Promise.all(promises);
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
        const color = particle.getFillColor();
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

        if (image.svgData !== undefined && imageData.replaceColor && color) {
            const svgColoredData = replaceColorSvg(image, color, particle.opacity?.value ?? 1);

            /* prepare to create img with colored svg */
            const svg = new Blob([svgColoredData], { type: "image/svg+xml" });
            const domUrl = URL || window.URL || window.webkitURL || window;
            const url = domUrl.createObjectURL(svg);

            /* create particle img obj */
            const img = new Image();

            imageRes = {
                data: {
                    ...image,
                    svgData: svgColoredData,
                },
                ratio: imageData.width / imageData.height,
                replaceColor: imageData.replaceColor ?? imageData.replace_color,
                source: imageData.src,
            };

            img.addEventListener("load", () => {
                const pImage = (particle as unknown as IImageParticle).image;
                if (pImage) {
                    pImage.loaded = true;
                    image.element = img;
                }

                domUrl.revokeObjectURL(url);
            });

            img.addEventListener("error", () => {
                domUrl.revokeObjectURL(url);

                const img2 = {
                    ...image,
                    error: false,
                    loading: true,
                };

                // deepcode ignore PromiseNotCaughtGeneral: catch can be ignored
                loadImage(img2).then(() => {
                    const pImage = (particle as unknown as IImageParticle).image;

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

        (particle as unknown as IImageParticle).image = imageShape.image;
        particle.fill = imageShape.fill;
        particle.close = imageShape.close;
    }
}
