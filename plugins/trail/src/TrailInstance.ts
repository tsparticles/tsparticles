import {
    type Engine,
    type IContainerPlugin,
    type IRgb,
    getLogger,
    getStyleFromRgb,
    rangeColorToRgb,
} from "@tsparticles/engine";
import type { TrailContainer } from "./types.js";

const minimumLength = 0,
    inverseFactorNumerator = 1;

interface ITrailFillData {
    color?: IRgb;
    image?: HTMLImageElement;
    opacity: number;
}

export class TrailInstance implements IContainerPlugin {
    private readonly _container;
    private readonly _engine;
    private _trailFill?: ITrailFillData;

    constructor(container: TrailContainer, engine: Engine) {
        this._container = container;
        this._engine = engine;
    }

    canvasClear(): boolean {
        const trail = this._container.actualOptions.trail,
            trailFill = this._trailFill;

        if (!trail?.enable || !trailFill || trail.length <= minimumLength) {
            return false;
        }

        let handled = false;

        const canvas = this._container.canvas;

        if (trailFill.color) {
            canvas.paintBase(getStyleFromRgb(trailFill.color, trailFill.opacity));

            handled = true;
        } else if (trailFill.image) {
            canvas.paintImage(trailFill.image, trailFill.opacity);

            handled = true;
        }

        return handled;
    }

    async init(): Promise<void> {
        try {
            await this._initTrail();
        } catch (e) {
            getLogger().error(e);
        }
    }

    private readonly _initTrail: () => Promise<void> = async () => {
        const options = this._container.actualOptions,
            trail = options.trail;

        if (!trail?.enable) {
            return;
        }

        const trailFill = trail.fill,
            opacity = inverseFactorNumerator / trail.length;

        if (trailFill.color) {
            const fillColor = rangeColorToRgb(this._engine, trailFill.color);

            if (!fillColor) {
                return;
            }

            this._trailFill = {
                color: {
                    ...fillColor,
                },
                opacity,
            };
        } else {
            await new Promise<void>((resolve, reject) => {
                if (!trailFill.image) {
                    return;
                }

                const img = document.createElement("img");

                img.addEventListener("load", () => {
                    this._trailFill = {
                        image: img,
                        opacity,
                    };

                    resolve();
                });

                img.addEventListener("error", evt => {
                    getLogger().error(evt);

                    reject(new Error("Error loading image"));
                });

                img.src = trailFill.image;
            });
        }
    };
}
