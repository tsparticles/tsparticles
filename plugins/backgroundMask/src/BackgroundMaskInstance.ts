import {
    type Engine,
    type IContainerPlugin,
    getHdrStyleFromRgb,
    getLogger,
    getStyleFromRgb,
    rangeColorToRgb,
} from "@tsparticles/engine";
import type { BackgroundMaskContainer } from "./types.js";

export class BackgroundMaskInstance implements IContainerPlugin {
    private readonly _container;
    private _coverColorStyle?: string;
    private _coverImage?: { image: HTMLImageElement; opacity: number };
    private _defaultCompositeValue?: GlobalCompositeOperation;
    private readonly _engine;

    constructor(container: BackgroundMaskContainer, engine: Engine) {
        this._container = container;
        this._engine = engine;
    }

    canvasClear(): boolean {
        const backgroundMask = this._container.actualOptions.backgroundMask;

        if (!backgroundMask?.enable) {
            return false;
        }

        return this.canvasPaint();
    }

    canvasPaint(): boolean {
        if (!this._container.actualOptions.backgroundMask?.enable) {
            return false;
        }

        const canvas = this._container.canvas;

        canvas.canvasClear();

        if (this._coverImage) {
            canvas.paintImage(this._coverImage.image, this._coverImage.opacity);
        } else {
            canvas.paintBase(this._coverColorStyle);
        }

        return true;
    }

    clearDraw(context: CanvasRenderingContext2D): void {
        if (!this._defaultCompositeValue) {
            return;
        }

        context.globalCompositeOperation = this._defaultCompositeValue;
    }

    draw(context: CanvasRenderingContext2D): void {
        const previousComposite = context.globalCompositeOperation,
            backgroundMask = this._container.actualOptions.backgroundMask;

        this._defaultCompositeValue = previousComposite;

        context.globalCompositeOperation = backgroundMask?.enable ? backgroundMask.composite : previousComposite;
    }

    async init(): Promise<void> {
        await this._initCover();
    }

    private readonly _initCover = async (): Promise<void> => {
        const options = this._container.actualOptions,
            cover = options.backgroundMask?.cover,
            color = cover?.color;

        if (color) {
            const coverRgb = rangeColorToRgb(this._engine, color);

            if (coverRgb) {
                const coverColor = {
                    ...coverRgb,
                    a: cover.opacity,
                };

                this._coverColorStyle = this._container.hdr
                    ? getHdrStyleFromRgb(coverColor, coverColor.a)
                    : getStyleFromRgb(coverColor, coverColor.a);
            }
        } else {
            await new Promise<void>((resolve, reject) => {
                if (!cover?.image) {
                    return;
                }

                const img = document.createElement("img");

                img.addEventListener("load", () => {
                    this._coverImage = {
                        image: img,
                        opacity: cover.opacity,
                    };

                    resolve();
                });

                img.addEventListener("error", evt => {
                    getLogger().error(evt);

                    reject(new Error("Error loading image"));
                });

                img.src = cover.image;
            });
        }
    };
}
