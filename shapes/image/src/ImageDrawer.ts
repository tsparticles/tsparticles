import {
    type Container,
    type ICoordinates,
    type IShapeDrawData,
    type IShapeDrawer,
    errorPrefix,
} from "@tsparticles/engine";
import { type IImage, type IParticleImage, type ImageParticle, replaceImageColor } from "./Utils.js";
import type { ImageContainer, ImageEngine } from "./types.js";
import { DisposalMethod } from "./GifUtils/Enums/DisposalMethod.js";
import type { IImageShape } from "./IImageShape.js";

const origin: ICoordinates = {
        x: 0,
        y: 0,
    },
    defaultLoopCount = 0,
    defaultFrame = 0,
    half = 0.5,
    initialTime = 0,
    firstIndex = 0,
    double = 2,
    defaultAlpha = 1,
    sides = 12,
    defaultRatio = 1;

/**
 * Particles Image Drawer
 */
export class ImageDrawer implements IShapeDrawer<ImageParticle> {
    private readonly _engine: ImageEngine;

    /**
     * Image drawer constructor, initializing the image set collection
     * @param engine -
     */
    constructor(engine: ImageEngine) {
        this._engine = engine;
    }

    /**
     * Adds an image to the given container
     * @param image - the image to add to the container collection
     */
    addImage(image: IImage): void {
        if (!this._engine.images) {
            this._engine.images = [];
        }

        this._engine.images.push(image);
    }

    /**
     * The draw image method
     * @param data - the shape draw data
     */
    draw(data: IShapeDrawData<ImageParticle>): void {
        const { context, radius, particle, opacity, delta } = data,
            image = particle.image,
            element = image?.element;

        if (!image) {
            return;
        }

        context.globalAlpha = opacity;

        if (image.gif && image.gifData) {
            const offscreenCanvas = new OffscreenCanvas(image.gifData.width, image.gifData.height),
                offscreenContext = offscreenCanvas.getContext("2d");

            if (!offscreenContext) {
                throw new Error("could not create offscreen canvas context");
            }

            offscreenContext.imageSmoothingQuality = "low";
            offscreenContext.imageSmoothingEnabled = false;

            offscreenContext.clearRect(origin.x, origin.y, offscreenCanvas.width, offscreenCanvas.height);

            if (particle.gifLoopCount === undefined) {
                particle.gifLoopCount = image.gifLoopCount ?? defaultLoopCount;
            }

            let frameIndex = particle.gifFrame ?? defaultFrame;

            const pos = { x: -image.gifData.width * half, y: -image.gifData.height * half },
                frame = image.gifData.frames[frameIndex];

            if (particle.gifTime === undefined) {
                particle.gifTime = initialTime;
            }

            if (!frame.bitmap) {
                return;
            }

            context.scale(radius / image.gifData.width, radius / image.gifData.height);

            switch (frame.disposalMethod) {
                case DisposalMethod.UndefinedA: // ! fall through
                case DisposalMethod.UndefinedB: // ! fall through
                case DisposalMethod.UndefinedC: // ! fall through
                case DisposalMethod.UndefinedD: // ! fall through
                case DisposalMethod.Replace:
                    offscreenContext.drawImage(frame.bitmap, frame.left, frame.top);

                    context.drawImage(offscreenCanvas, pos.x, pos.y);

                    offscreenContext.clearRect(origin.x, origin.y, offscreenCanvas.width, offscreenCanvas.height);

                    break;
                case DisposalMethod.Combine:
                    offscreenContext.drawImage(frame.bitmap, frame.left, frame.top);

                    context.drawImage(offscreenCanvas, pos.x, pos.y);

                    break;
                case DisposalMethod.RestoreBackground:
                    offscreenContext.drawImage(frame.bitmap, frame.left, frame.top);

                    context.drawImage(offscreenCanvas, pos.x, pos.y);

                    offscreenContext.clearRect(origin.x, origin.y, offscreenCanvas.width, offscreenCanvas.height);

                    if (!image.gifData.globalColorTable.length) {
                        offscreenContext.putImageData(
                            image.gifData.frames[firstIndex].image,
                            pos.x + frame.left,
                            pos.y + frame.top,
                        );
                    } else {
                        offscreenContext.putImageData(image.gifData.backgroundImage, pos.x, pos.y);
                    }

                    break;
                case DisposalMethod.RestorePrevious:
                    {
                        const previousImageData = offscreenContext.getImageData(
                            origin.x,
                            origin.y,
                            offscreenCanvas.width,
                            offscreenCanvas.height,
                        );

                        offscreenContext.drawImage(frame.bitmap, frame.left, frame.top);

                        context.drawImage(offscreenCanvas, pos.x, pos.y);

                        offscreenContext.clearRect(origin.x, origin.y, offscreenCanvas.width, offscreenCanvas.height);
                        offscreenContext.putImageData(previousImageData, origin.x, origin.y);
                    }
                    break;
            }

            particle.gifTime += delta.value;

            if (particle.gifTime > frame.delayTime) {
                particle.gifTime -= frame.delayTime;

                if (++frameIndex >= image.gifData.frames.length) {
                    if (--particle.gifLoopCount <= defaultLoopCount) {
                        return;
                    }

                    frameIndex = firstIndex;

                    // ? so apparently some GIFs seam to set the disposal method of the last frame wrong?...so this is a "fix" for that (clear after the last frame)
                    offscreenContext.clearRect(origin.x, origin.y, offscreenCanvas.width, offscreenCanvas.height);
                }

                particle.gifFrame = frameIndex;
            }

            context.scale(image.gifData.width / radius, image.gifData.height / radius);
        } else if (element) {
            const ratio = image.ratio,
                pos = {
                    x: -radius,
                    y: -radius,
                },
                diameter = radius * double;

            context.drawImage(element, pos.x, pos.y, diameter, diameter / ratio);
        }

        context.globalAlpha = defaultAlpha;
    }

    /**
     * Returning the side count for the image, defaults to 12 for using the inner circle as rendering
     * When using non-transparent images this can be an issue with shadows
     * @returns the number of sides of the image shape
     */
    getSidesCount(): number {
        return sides;
    }

    async init(container: ImageContainer): Promise<void> {
        const options = container.actualOptions;

        if (!options.preload || !this._engine.loadImage) {
            return;
        }

        for (const imageData of options.preload) {
            await this._engine.loadImage(imageData);
        }
    }

    loadShape(particle: ImageParticle): void {
        if (particle.shape !== "image" && particle.shape !== "images") {
            return;
        }

        if (!this._engine.images) {
            this._engine.images = [];
        }

        const imageData = particle.shapeData as IImageShape | undefined;

        if (!imageData) {
            return;
        }

        const image = this._engine.images.find((t: IImage) => t.name === imageData.name || t.source === imageData.src);

        if (!image) {
            void this.loadImageShape(imageData).then(() => {
                this.loadShape(particle);
            });
        }
    }

    /**
     * Loads the image shape to the given particle
     * @param container - the particles container
     * @param particle - the particle loading the image shape
     */
    particleInit(container: Container, particle: ImageParticle): void {
        if (particle.shape !== "image" && particle.shape !== "images") {
            return;
        }

        if (!this._engine.images) {
            this._engine.images = [];
        }

        const images = this._engine.images,
            imageData = particle.shapeData as IImageShape | undefined;

        if (!imageData) {
            return;
        }

        const color = particle.getFillColor(),
            image = images.find((t: IImage) => t.name === imageData.name || t.source === imageData.src);

        if (!image) {
            return;
        }

        const replaceColor = imageData.replaceColor ?? image.replaceColor;

        if (image.loading) {
            setTimeout((): void => {
                this.particleInit(container, particle);
            });

            return;
        }

        void (async (): Promise<void> => {
            let imageRes: IParticleImage;

            if (image.svgData && color) {
                imageRes = await replaceImageColor(image, imageData, color, particle);
            } else {
                imageRes = {
                    color,
                    data: image,
                    element: image.element,
                    gif: image.gif,
                    gifData: image.gifData,
                    gifLoopCount: image.gifLoopCount,
                    loaded: true,
                    ratio:
                        imageData.width && imageData.height
                            ? imageData.width / imageData.height
                            : image.ratio ?? defaultRatio,
                    replaceColor: replaceColor,
                    source: imageData.src,
                };
            }

            if (!imageRes.ratio) {
                imageRes.ratio = 1;
            }

            const fill = imageData.fill ?? particle.shapeFill,
                close = imageData.close ?? particle.shapeClose,
                imageShape = {
                    image: imageRes,
                    fill,
                    close,
                };

            particle.image = imageShape.image;
            particle.shapeFill = imageShape.fill;
            particle.shapeClose = imageShape.close;
        })();
    }

    /**
     * Loads the image shape
     * @param imageShape - the image shape to load
     * @internal
     */
    private readonly loadImageShape: (imageShape: IImageShape) => Promise<void> = async (imageShape) => {
        if (!this._engine.loadImage) {
            throw new Error(`${errorPrefix} image shape not initialized`);
        }

        await this._engine.loadImage({
            gif: imageShape.gif,
            name: imageShape.name,
            replaceColor: imageShape.replaceColor ?? false,
            src: imageShape.src,
        });
    };
}
