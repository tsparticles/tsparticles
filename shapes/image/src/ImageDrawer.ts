import { type Container, type IDelta, type IShapeDrawer, errorPrefix } from "tsparticles-engine";
import type { IImage, IParticleImage, ImageParticle } from "./Utils";
import type { ImageContainer, ImageEngine } from "./types";
import { DisposalMethod } from "./GifUtils/DisposalMethod";
import type { IImageShape } from "./IImageShape";
import { replaceImageColor } from "./Utils";

/**
 * Particles Image Drawer
 */
export class ImageDrawer implements IShapeDrawer {
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
     * @param context - the context used for drawing
     * @param particle - the particle to be drawn
     * @param radius - the particle radius
     * @param opacity - the particle opacity
     * @param delta - delta time since last draw
     */
    draw(
        context: CanvasRenderingContext2D,
        particle: ImageParticle,
        radius: number,
        opacity: number,
        delta: IDelta
    ): void {
        const image = particle.image,
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

            offscreenContext.clearRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);

            if (particle.gifLoopCount === undefined) {
                particle.gifLoopCount = image.gifLoopCount ?? 0;
            }

            let frameIndex = particle.gifFrame ?? 0;

            const pos = { x: -image.gifData.width * 0.5, y: -image.gifData.height * 0.5 },
                frame = image.gifData.frames[frameIndex];

            if (particle.gifTime === undefined) {
                particle.gifTime = 0;
            }

            if (!frame.bitmap) {
                return;
            }

            context.scale(radius / image.gifData.width, radius / image.gifData.height);

            switch (frame.disposalMethod) {
                case DisposalMethod.UndefinedA: //! fall through
                case DisposalMethod.UndefinedB: //! fall through
                case DisposalMethod.UndefinedC: //! fall through
                case DisposalMethod.UndefinedD: //! fall through
                case DisposalMethod.Replace:
                    offscreenContext.drawImage(frame.bitmap, frame.left, frame.top);

                    context.drawImage(offscreenCanvas, pos.x, pos.y);

                    offscreenContext.clearRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);

                    break;
                case DisposalMethod.Combine:
                    offscreenContext.drawImage(frame.bitmap, frame.left, frame.top);

                    context.drawImage(offscreenCanvas, pos.x, pos.y);

                    break;
                case DisposalMethod.RestoreBackground:
                    offscreenContext.drawImage(frame.bitmap, frame.left, frame.top);

                    context.drawImage(offscreenCanvas, pos.x, pos.y);

                    offscreenContext.clearRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);

                    if (image.gifData.globalColorTable.length === 0) {
                        offscreenContext.putImageData(
                            image.gifData.frames[0].image,
                            pos.x + frame.left,
                            pos.y + frame.top
                        );
                    } else {
                        offscreenContext.putImageData(image.gifData.backgroundImage, pos.x, pos.y);
                    }

                    break;
                case DisposalMethod.RestorePrevious:
                    {
                        const previousImageData = offscreenContext.getImageData(
                            0,
                            0,
                            offscreenCanvas.width,
                            offscreenCanvas.height
                        );

                        offscreenContext.drawImage(frame.bitmap, frame.left, frame.top);

                        context.drawImage(offscreenCanvas, pos.x, pos.y);

                        offscreenContext.clearRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);
                        offscreenContext.putImageData(previousImageData, 0, 0);
                    }
                    break;
            }

            particle.gifTime += delta.value;

            if (particle.gifTime > frame.delayTime) {
                particle.gifTime -= frame.delayTime;

                if (++frameIndex >= image.gifData.frames.length) {
                    if (--particle.gifLoopCount <= 0) {
                        return;
                    }

                    frameIndex = 0;

                    //? so apparently some GIFs seam to set the disposal method of the last frame wrong?...so this is a "fix" for that (clear after the last frame)
                    offscreenContext.clearRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);
                }

                particle.gifFrame = frameIndex;
            }

            context.scale(image.gifData.width / radius, image.gifData.height / radius);
        } else if (element) {
            const ratio = image.ratio,
                pos = {
                    x: -radius,
                    y: -radius,
                };

            context.drawImage(element, pos.x, pos.y, radius * 2, (radius * 2) / ratio);
        }

        context.globalAlpha = 1;
    }

    /**
     * Returning the side count for the image, defaults to 12 for using the inner circle as rendering
     * When using non-transparent images this can be an issue with shadows
     * @returns the number of sides of the image shape
     */
    getSidesCount(): number {
        return 12;
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

        const imageData = particle.shapeData as IImageShape,
            image = this._engine.images.find((t: IImage) => t.name === imageData.name || t.source === imageData.src);

        if (!image) {
            this.loadImageShape(imageData).then(() => {
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
            imageData = particle.shapeData as IImageShape,
            color = particle.getFillColor(),
            image = images.find((t: IImage) => t.name === imageData.name || t.source === imageData.src);

        if (!image) {
            return;
        }

        const replaceColor = imageData.replaceColor ?? imageData.replace_color ?? image.replaceColor;

        if (image.loading) {
            setTimeout((): void => {
                this.particleInit(container, particle);
            });

            return;
        }

        (async (): Promise<void> => {
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
                    ratio: imageData.width && imageData.height ? imageData.width / imageData.height : image.ratio ?? 1,
                    replaceColor: replaceColor,
                    source: imageData.src,
                };
            }

            if (!imageRes.ratio) {
                imageRes.ratio = 1;
            }

            const fill = imageData.fill ?? particle.fill,
                close = imageData.close ?? particle.close,
                imageShape = {
                    image: imageRes,
                    fill,
                    close,
                };

            particle.image = imageShape.image;
            particle.fill = imageShape.fill;
            particle.close = imageShape.close;
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
            replaceColor: imageShape.replaceColor ?? imageShape.replace_color ?? false,
            src: imageShape.src,
        });
    };
}
