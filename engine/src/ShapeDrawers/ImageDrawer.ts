import type { IParticle, IShapeDrawer } from "../Core/Interfaces";
import { downloadSvgImage, isInArray, loadImage } from "../Utils";
import { ShapeType } from "../Enums";
import type { IImageShape } from "../Options/Interfaces/Particles/Shape/IImageShape";
import type { IImage } from "../Core/Interfaces/IImage";
import type { Container } from "../Core/Container";
import type { IEmitterOptions } from "../Plugins/Emitters/Options/Interfaces/IEmitterOptions";
import type { IParticles } from "../Options/Interfaces/Particles/IParticles";
import type { RecursivePartial } from "../Types";

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
        await this.loadImagesFromParticlesOptions(container, container.actualOptions.particles);

        await this.loadImagesFromParticlesOptions(
            container,
            container.actualOptions.interactivity.modes.trail.particles
        );

        for (const manualParticle of container.actualOptions.manualParticles) {
            await this.loadImagesFromParticlesOptions(container, manualParticle.options);
        }

        const emitterOptions = container.actualOptions as unknown as IEmitterOptions;

        if (emitterOptions.emitters) {
            if (emitterOptions.emitters instanceof Array) {
                for (const emitter of emitterOptions.emitters) {
                    await this.loadImagesFromParticlesOptions(container, emitter.particles);
                }
            } else {
                await this.loadImagesFromParticlesOptions(container, emitterOptions.emitters.particles);
            }
        }

        const interactiveEmitters = emitterOptions.interactivity.modes.emitters;

        if (interactiveEmitters) {
            if (interactiveEmitters instanceof Array) {
                for (const emitter of interactiveEmitters) {
                    await this.loadImagesFromParticlesOptions(container, emitter.particles);
                }
            } else {
                await this.loadImagesFromParticlesOptions(container, interactiveEmitters.particles);
            }
        }
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

        if (options?.groups) {
            for (const groupName in options.groups) {
                const group = options.groups[groupName];

                await this.loadImagesFromParticlesOptions(container, group);
            }
        }

        if (options?.destroy?.split?.particles) {
            await this.loadImagesFromParticlesOptions(container, options?.destroy.split.particles);
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
